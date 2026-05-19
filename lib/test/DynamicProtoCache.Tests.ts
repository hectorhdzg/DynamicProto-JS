/// <reference path="./TestFramework/Common.ts" />

import dynamicProto from "../src/DynamicProto";

// =====================================================================
// Test classes for verifying prototype chain caching behavior.
// The cache (_dynBaseFuncs) stores {funcName → sourceProto} per class
// and must only be used for the class it was built on (own property).
// =====================================================================

interface ICacheTest {
    executionOrder: string[];
    doWork?(): void;
}

// --- Hierarchy 1: Deep chain to validate O(M) on 2nd+ instance ---
class CacheBase implements ICacheTest {
    public executionOrder: string[] = [];

    constructor() {
        this.executionOrder.push("CacheBase()");
    }

    public doWork() {
        this.executionOrder.push("CacheBase.doWork()");
    }
}

class CacheMid extends CacheBase {
    constructor() {
        super();
        this.executionOrder.push("CacheMid()");
    }

    public doWork() {
        super.doWork();
        this.executionOrder.push("CacheMid.doWork()");
    }
}

class DynCacheLeaf extends CacheMid {
    constructor() {
        super();
        this.executionOrder.push("DynCacheLeaf()");
        dynamicProto(DynCacheLeaf, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("DynCacheLeaf.doWork()");
            };
        });
    }
}

// --- Hierarchy 2: Sibling classes sharing a parent ---
class SharedBase implements ICacheTest {
    public executionOrder: string[] = [];

    constructor() {
        this.executionOrder.push("SharedBase()");
    }

    public doWork() {
        this.executionOrder.push("SharedBase.doWork()");
    }
}

class DynSiblingA extends SharedBase {
    constructor() {
        super();
        this.executionOrder.push("DynSiblingA()");
        dynamicProto(DynSiblingA, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("DynSiblingA.doWork()");
            };
        });
    }
}

class DynSiblingB extends SharedBase {
    constructor() {
        super();
        this.executionOrder.push("DynSiblingB()");
        dynamicProto(DynSiblingB, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("DynSiblingB.doWork()");
            };
        });
    }
}

// --- Hierarchy 3: DynamicProto at multiple levels ---
class DynMultiBase implements ICacheTest {
    public executionOrder: string[] = [];
    public doWork?(): void;

    constructor() {
        this.executionOrder.push("DynMultiBase()");
        dynamicProto(DynMultiBase, this, (_self, base) => {
            _self.doWork = () => {
                this.executionOrder.push("DynMultiBase.doWork()");
            };
        });
    }
}

class DynMultiMid extends DynMultiBase {
    constructor() {
        super();
        this.executionOrder.push("DynMultiMid()");
        dynamicProto(DynMultiMid, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("DynMultiMid.doWork()");
            };
        });
    }
}

class DynMultiLeaf extends DynMultiMid {
    constructor() {
        super();
        this.executionOrder.push("DynMultiLeaf()");
        dynamicProto(DynMultiLeaf, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("DynMultiLeaf.doWork()");
            };
        });
    }
}

// --- Hierarchy 4: Non-dynamic class sandwiched between dynamic classes ---
class DynSandwichBase implements ICacheTest {
    public executionOrder: string[] = [];
    public doWork?(): void;

    constructor() {
        this.executionOrder.push("DynSandwichBase()");
        dynamicProto(DynSandwichBase, this, (_self, base) => {
            _self.doWork = () => {
                this.executionOrder.push("DynSandwichBase.doWork()");
            };
        });
    }
}

class PlainSandwichMid extends DynSandwichBase {
    constructor() {
        super();
        this.executionOrder.push("PlainSandwichMid()");
    }

    public doWork() {
        super.doWork();
        this.executionOrder.push("PlainSandwichMid.doWork()");
    }
}

class DynSandwichLeaf extends PlainSandwichMid {
    constructor() {
        super();
        this.executionOrder.push("DynSandwichLeaf()");
        dynamicProto(DynSandwichLeaf, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("DynSandwichLeaf.doWork()");
            };
        });
    }
}

// --- Hierarchy 5: Many methods to validate M methods are all cached ---
class ManyMethodsBase implements ICacheTest {
    public executionOrder: string[] = [];
    public doWork?(): void;
    public method1?(): string;
    public method2?(): string;
    public method3?(): string;
    public method4?(): string;
    public method5?(): string;

    constructor() {
        dynamicProto(ManyMethodsBase, this, (_self) => {
            _self.doWork = () => { this.executionOrder.push("Base.doWork()"); };
            _self.method1 = () => "base1";
            _self.method2 = () => "base2";
            _self.method3 = () => "base3";
            _self.method4 = () => "base4";
            _self.method5 = () => "base5";
        });
    }
}

class ManyMethodsDerived extends ManyMethodsBase {
    constructor() {
        super();
        dynamicProto(ManyMethodsDerived, this, (_self, base) => {
            _self.doWork = () => {
                base.doWork();
                this.executionOrder.push("Derived.doWork()");
            };
            _self.method1 = () => base.method1() + "+derived1";
            _self.method3 = () => base.method3() + "+derived3";
            _self.method5 = () => base.method5() + "+derived5";
        });
    }
}

export class DynamicProtoCacheTests extends TestClass {

    public testInitialize() {
    }

    private _validateOrder(message: string, actual: string[], expected: string[]) {
        QUnit.assert.equal(actual.length, expected.length, message + ": Checking the length");

        let passed = true;
        let error = "";
        for (let lp = 0; lp < expected.length; lp++) {
            if (lp < actual.length) {
                if (actual[lp] !== expected[lp]) {
                    passed = false;
                    error += " **[" + actual[lp] + "!=" + expected[lp] + "]**;";
                } else {
                    error += " " + expected[lp] + ";";
                }
            } else {
                passed = false;
                error += " --[" + expected[lp] + "]--;";
            }
        }

        for (let lp = expected.length; lp < actual.length; lp++) {
            passed = false;
            error += " ++[" + actual[lp] + "]++;";
        }

        QUnit.assert.ok(passed, message + ":" + error);
    }

    public registerTests() {
        this.testCase({
            name: "Cache: Multiple instances share cached proto chain",
            test: () => {
                // First instance builds the cache
                let inst1 = new DynCacheLeaf();
                inst1.doWork();
                this._validateOrder("Instance 1", inst1.executionOrder, [
                    "CacheBase()",
                    "CacheMid()",
                    "DynCacheLeaf()",
                    "CacheBase.doWork()",
                    "CacheMid.doWork()",
                    "DynCacheLeaf.doWork()"
                ]);

                // Second instance uses the cached proto funcs
                let inst2 = new DynCacheLeaf();
                inst2.doWork();
                this._validateOrder("Instance 2", inst2.executionOrder, [
                    "CacheBase()",
                    "CacheMid()",
                    "DynCacheLeaf()",
                    "CacheBase.doWork()",
                    "CacheMid.doWork()",
                    "DynCacheLeaf.doWork()"
                ]);

                // Third instance also uses cached proto funcs
                let inst3 = new DynCacheLeaf();
                inst3.doWork();
                this._validateOrder("Instance 3", inst3.executionOrder, [
                    "CacheBase()",
                    "CacheMid()",
                    "DynCacheLeaf()",
                    "CacheBase.doWork()",
                    "CacheMid.doWork()",
                    "DynCacheLeaf.doWork()"
                ]);

                // Verify instances are independent
                QUnit.assert.notStrictEqual(inst1.executionOrder, inst2.executionOrder, "Instances have independent state");
            }
        });

        this.testCase({
            name: "Cache: Sibling classes get independent caches",
            test: () => {
                let a1 = new DynSiblingA();
                a1.doWork();
                this._validateOrder("SiblingA inst1", a1.executionOrder, [
                    "SharedBase()",
                    "DynSiblingA()",
                    "SharedBase.doWork()",
                    "DynSiblingA.doWork()"
                ]);

                let b1 = new DynSiblingB();
                b1.doWork();
                this._validateOrder("SiblingB inst1", b1.executionOrder, [
                    "SharedBase()",
                    "DynSiblingB()",
                    "SharedBase.doWork()",
                    "DynSiblingB.doWork()"
                ]);

                // Second instances use cached data
                let a2 = new DynSiblingA();
                a2.doWork();
                this._validateOrder("SiblingA inst2", a2.executionOrder, [
                    "SharedBase()",
                    "DynSiblingA()",
                    "SharedBase.doWork()",
                    "DynSiblingA.doWork()"
                ]);

                let b2 = new DynSiblingB();
                b2.doWork();
                this._validateOrder("SiblingB inst2", b2.executionOrder, [
                    "SharedBase()",
                    "DynSiblingB()",
                    "SharedBase.doWork()",
                    "DynSiblingB.doWork()"
                ]);
            }
        });

        this.testCase({
            name: "Cache: Deep dynamic chain (3 levels of dynamicProto)",
            test: () => {
                // First instance triggers cache build at each level
                let inst1 = new DynMultiLeaf();
                inst1.doWork();
                this._validateOrder("Multi-level inst1", inst1.executionOrder, [
                    "DynMultiBase()",
                    "DynMultiMid()",
                    "DynMultiLeaf()",
                    "DynMultiBase.doWork()",
                    "DynMultiMid.doWork()",
                    "DynMultiLeaf.doWork()"
                ]);

                // Second instance uses cached chain at all levels
                let inst2 = new DynMultiLeaf();
                inst2.doWork();
                this._validateOrder("Multi-level inst2", inst2.executionOrder, [
                    "DynMultiBase()",
                    "DynMultiMid()",
                    "DynMultiLeaf()",
                    "DynMultiBase.doWork()",
                    "DynMultiMid.doWork()",
                    "DynMultiLeaf.doWork()"
                ]);

                // Intermediate class also works correctly with its own cache
                let mid1 = new DynMultiMid();
                mid1.doWork();
                this._validateOrder("Mid only inst1", mid1.executionOrder, [
                    "DynMultiBase()",
                    "DynMultiMid()",
                    "DynMultiBase.doWork()",
                    "DynMultiMid.doWork()"
                ]);
            }
        });

        this.testCase({
            name: "Cache: Non-dynamic class sandwiched between dynamic classes",
            test: () => {
                let inst1 = new DynSandwichLeaf();
                inst1.doWork();
                this._validateOrder("Sandwich inst1", inst1.executionOrder, [
                    "DynSandwichBase()",
                    "PlainSandwichMid()",
                    "DynSandwichLeaf()",
                    "DynSandwichBase.doWork()",
                    "PlainSandwichMid.doWork()",
                    "DynSandwichLeaf.doWork()"
                ]);

                // Second instance uses cached lookup (cache must not pick up parent's cache)
                let inst2 = new DynSandwichLeaf();
                inst2.doWork();
                this._validateOrder("Sandwich inst2", inst2.executionOrder, [
                    "DynSandwichBase()",
                    "PlainSandwichMid()",
                    "DynSandwichLeaf()",
                    "DynSandwichBase.doWork()",
                    "PlainSandwichMid.doWork()",
                    "DynSandwichLeaf.doWork()"
                ]);
            }
        });

        this.testCase({
            name: "Cache: Many methods are all resolved correctly",
            test: () => {
                let inst1 = new ManyMethodsDerived();
                inst1.doWork();
                this._validateOrder("ManyMethods inst1 doWork", inst1.executionOrder, [
                    "Base.doWork()",
                    "Derived.doWork()"
                ]);
                QUnit.assert.equal(inst1.method1(), "base1+derived1", "inst1 method1");
                QUnit.assert.equal(inst1.method2(), "base2", "inst1 method2 (not overridden)");
                QUnit.assert.equal(inst1.method3(), "base3+derived3", "inst1 method3");
                QUnit.assert.equal(inst1.method4(), "base4", "inst1 method4 (not overridden)");
                QUnit.assert.equal(inst1.method5(), "base5+derived5", "inst1 method5");

                // Second instance verifies cache correctly resolves all methods
                let inst2 = new ManyMethodsDerived();
                inst2.doWork();
                this._validateOrder("ManyMethods inst2 doWork", inst2.executionOrder, [
                    "Base.doWork()",
                    "Derived.doWork()"
                ]);
                QUnit.assert.equal(inst2.method1(), "base1+derived1", "inst2 method1");
                QUnit.assert.equal(inst2.method2(), "base2", "inst2 method2 (not overridden)");
                QUnit.assert.equal(inst2.method3(), "base3+derived3", "inst2 method3");
                QUnit.assert.equal(inst2.method4(), "base4", "inst2 method4 (not overridden)");
                QUnit.assert.equal(inst2.method5(), "base5+derived5", "inst2 method5");
            }
        });

        this.testCase({
            name: "Cache: Rapid instance creation (stress test)",
            test: () => {
                // Create many instances to verify cached path is stable
                let instances: DynMultiLeaf[] = [];
                for (let i = 0; i < 50; i++) {
                    instances.push(new DynMultiLeaf());
                }

                // Verify all instances work correctly
                for (let i = 0; i < instances.length; i++) {
                    instances[i].doWork();
                    this._validateOrder("Stress inst " + i, instances[i].executionOrder, [
                        "DynMultiBase()",
                        "DynMultiMid()",
                        "DynMultiLeaf()",
                        "DynMultiBase.doWork()",
                        "DynMultiMid.doWork()",
                        "DynMultiLeaf.doWork()"
                    ]);
                }
            }
        });
    }
}
