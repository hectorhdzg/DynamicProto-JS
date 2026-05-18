/// <reference path="./TestFramework/Common.ts" />

import dynamicProto from "../src/DynamicProto";

// Deep hierarchy: 10+ levels of dynamic proto inheritance to test caching performance
class DeepBase {
    public callOrder: string[] = [];
    public getValue?(): string;

    constructor() {
        dynamicProto(DeepBase, this, (_self, base) => {
            _self.getValue = () => {
                return "DeepBase";
            };
        });
    }
}

class DeepLevel1 extends DeepBase {
    constructor() {
        super();
        dynamicProto(DeepLevel1, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L1";
            };
        });
    }
}

class DeepLevel2 extends DeepLevel1 {
    constructor() {
        super();
        dynamicProto(DeepLevel2, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L2";
            };
        });
    }
}

class DeepLevel3 extends DeepLevel2 {
    constructor() {
        super();
        dynamicProto(DeepLevel3, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L3";
            };
        });
    }
}

class DeepLevel4 extends DeepLevel3 {
    constructor() {
        super();
        dynamicProto(DeepLevel4, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L4";
            };
        });
    }
}

class DeepLevel5 extends DeepLevel4 {
    constructor() {
        super();
        dynamicProto(DeepLevel5, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L5";
            };
        });
    }
}

class DeepLevel6 extends DeepLevel5 {
    constructor() {
        super();
        dynamicProto(DeepLevel6, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L6";
            };
        });
    }
}

class DeepLevel7 extends DeepLevel6 {
    constructor() {
        super();
        dynamicProto(DeepLevel7, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L7";
            };
        });
    }
}

class DeepLevel8 extends DeepLevel7 {
    constructor() {
        super();
        dynamicProto(DeepLevel8, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L8";
            };
        });
    }
}

class DeepLevel9 extends DeepLevel8 {
    constructor() {
        super();
        dynamicProto(DeepLevel9, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L9";
            };
        });
    }
}

class DeepLevel10 extends DeepLevel9 {
    constructor() {
        super();
        dynamicProto(DeepLevel10, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L10";
            };
        });
    }
}

// Deep hierarchy WITHOUT instance function shortcut (simulates frozen/readonly target scenario)
class DeepNoInstBase {
    public callOrder: string[] = [];
    public getValue?(): string;

    constructor() {
        dynamicProto(DeepNoInstBase, this, (_self, base) => {
            _self.getValue = () => {
                return "DeepNoInstBase";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel1 extends DeepNoInstBase {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel1, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L1";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel2 extends DeepNoInstLevel1 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel2, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L2";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel3 extends DeepNoInstLevel2 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel3, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L3";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel4 extends DeepNoInstLevel3 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel4, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L4";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel5 extends DeepNoInstLevel4 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel5, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L5";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel6 extends DeepNoInstLevel5 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel6, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L6";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel7 extends DeepNoInstLevel6 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel7, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L7";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel8 extends DeepNoInstLevel7 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel8, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L8";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel9 extends DeepNoInstLevel8 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel9, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L9";
            };
        }, { setInstFuncs: false });
    }
}

class DeepNoInstLevel10 extends DeepNoInstLevel9 {
    constructor() {
        super();
        dynamicProto(DeepNoInstLevel10, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">L10";
            };
        }, { setInstFuncs: false });
    }
}

// Frozen target class - tests that caching works when Object.freeze prevents the shortcut
class FrozenTargetBase {
    public getValue?(): string;

    constructor() {
        dynamicProto(FrozenTargetBase, this, (_self, base) => {
            _self.getValue = () => {
                return "FrozenBase";
            };
        });
    }
}

class FrozenTargetChild extends FrozenTargetBase {
    constructor() {
        super();
        dynamicProto(FrozenTargetChild, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">FrozenChild";
            };
        });
        // Freeze after dynamicProto setup - the shortcut install will fail on subsequent calls
        // but the cache should still resolve the function correctly
        Object.freeze(this);
    }
}

// Class that supports re-registration of dynamic functions via a public method.
// Each dynamicProto call creates a genuinely new function (not sharing a closure variable)
// so stale cache bugs are caught.
class ReRegistrableBase {
    public getValue?(): string;
    public reRegister: () => void;

    constructor() {
        dynamicProto(ReRegistrableBase, this, (_self, base) => {
            _self.getValue = () => {
                return "Base:v1";
            };
        });

        this.reRegister = () => {
            dynamicProto(ReRegistrableBase, this, (_self, base) => {
                _self.getValue = () => {
                    return "Base:v2";
                };
            });
        };
    }
}

class ReRegistrableChild extends ReRegistrableBase {
    constructor() {
        super();
        dynamicProto(ReRegistrableChild, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">Child";
            };
        });
    }
}

// Class where dynamicProto is called multiple times in the constructor (e.g. mixins / plugins pattern)
class MultiDynProtoBase {
    public getA?(): string;
    public getB?(): string;

    constructor() {
        // First dynamicProto call sets getA
        dynamicProto(MultiDynProtoBase, this, (_self, base) => {
            _self.getA = () => {
                return "A:v1";
            };
        });

        // Second dynamicProto call overrides getA and sets getB
        dynamicProto(MultiDynProtoBase, this, (_self, base) => {
            _self.getA = () => {
                return "A:v2";
            };
            _self.getB = () => {
                return "B:v1";
            };
        });
    }
}

// setInstFuncs:false variant of re-registration to test the non-shortcut cache path
class ReRegistrableNoInstBase {
    public getValue?(): string;
    public reRegister: () => void;

    constructor() {
        dynamicProto(ReRegistrableNoInstBase, this, (_self, base) => {
            _self.getValue = () => {
                return "Base:v1";
            };
        }, { setInstFuncs: false });

        this.reRegister = () => {
            dynamicProto(ReRegistrableNoInstBase, this, (_self, base) => {
                _self.getValue = () => {
                    return "Base:v2";
                };
            }, { setInstFuncs: false });
        };
    }
}

class ReRegistrableNoInstChild extends ReRegistrableNoInstBase {
    constructor() {
        super();
        dynamicProto(ReRegistrableNoInstChild, this, (_self, base) => {
            _self.getValue = () => {
                return base.getValue() + ">Child";
            };
        }, { setInstFuncs: false });
    }
}

export class DynamicProtoDeepHierarchyTests extends TestClass {

    public testInitialize() {
    }

    public registerTests() {
        this.testCase({
            name: "Deep Hierarchy: 10 levels of dynamic proto inheritance produces correct call chain",
            test: () => {
                let inst = new DeepLevel10();
                let result = inst.getValue();
                QUnit.assert.equal(result, "DeepBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Full 10-level call chain should resolve correctly");
            }
        });

        this.testCase({
            name: "Deep Hierarchy: Multiple instances share correct resolution",
            test: () => {
                let inst1 = new DeepLevel10();
                let inst2 = new DeepLevel10();
                QUnit.assert.equal(inst1.getValue(), "DeepBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "First instance resolves correctly");
                QUnit.assert.equal(inst2.getValue(), "DeepBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Second instance resolves correctly");
                // Call again to exercise the cache path
                QUnit.assert.equal(inst1.getValue(), "DeepBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "First instance repeated call resolves correctly");
                QUnit.assert.equal(inst2.getValue(), "DeepBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Second instance repeated call resolves correctly");
            }
        });

        this.testCase({
            name: "Deep Hierarchy (no setInstFuncs): 10 levels without instance shortcut resolves correctly",
            test: () => {
                let inst = new DeepNoInstLevel10();
                let result = inst.getValue();
                QUnit.assert.equal(result, "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Full 10-level no-inst call chain should resolve correctly");
            }
        });

        this.testCase({
            name: "Deep Hierarchy (no setInstFuncs): Repeated calls use cached path",
            test: () => {
                let inst = new DeepNoInstLevel10();
                // First call resolves and caches
                let result1 = inst.getValue();
                // Subsequent calls should use cache
                let result2 = inst.getValue();
                let result3 = inst.getValue();
                QUnit.assert.equal(result1, "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "First call resolves correctly");
                QUnit.assert.equal(result2, "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Second call (cached) resolves correctly");
                QUnit.assert.equal(result3, "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Third call (cached) resolves correctly");
            }
        });

        this.testCase({
            name: "Deep Hierarchy (no setInstFuncs): Multiple instances with repeated calls",
            test: () => {
                let inst1 = new DeepNoInstLevel10();
                let inst2 = new DeepNoInstLevel10();
                let inst3 = new DeepNoInstLevel5();

                // Each instance should independently cache and resolve correctly
                QUnit.assert.equal(inst1.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Instance 1 first call");
                QUnit.assert.equal(inst2.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Instance 2 first call");
                QUnit.assert.equal(inst3.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5", "Instance 3 (Level5) first call");

                // Repeated calls from cache
                QUnit.assert.equal(inst1.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Instance 1 cached call");
                QUnit.assert.equal(inst2.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7>L8>L9>L10", "Instance 2 cached call");
                QUnit.assert.equal(inst3.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5", "Instance 3 (Level5) cached call");
            }
        });

        this.testCase({
            name: "Deep Hierarchy (no setInstFuncs): Mid-hierarchy instantiation works correctly",
            test: () => {
                let inst5 = new DeepNoInstLevel5();
                let inst7 = new DeepNoInstLevel7();

                QUnit.assert.equal(inst5.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5", "Level5 instance resolves correctly");
                QUnit.assert.equal(inst7.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7", "Level7 instance resolves correctly");

                // Repeated
                QUnit.assert.equal(inst5.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5", "Level5 repeated call");
                QUnit.assert.equal(inst7.getValue(), "DeepNoInstBase>L1>L2>L3>L4>L5>L6>L7", "Level7 repeated call");
            }
        });

        this.testCase({
            name: "Frozen target: Dynamic proto works correctly after Object.freeze",
            test: () => {
                let inst = new FrozenTargetChild();
                QUnit.assert.ok(Object.isFrozen(inst), "Instance should be frozen");
                let result = inst.getValue();
                QUnit.assert.equal(result, "FrozenBase>FrozenChild", "Frozen instance should still resolve dynamic functions correctly");
                // Repeated call should work via cache
                let result2 = inst.getValue();
                QUnit.assert.equal(result2, "FrozenBase>FrozenChild", "Frozen instance repeated call should resolve correctly");
            }
        });

        this.testCase({
            name: "Frozen target: Multiple frozen instances resolve independently",
            test: () => {
                let inst1 = new FrozenTargetChild();
                let inst2 = new FrozenTargetChild();
                QUnit.assert.ok(Object.isFrozen(inst1), "Instance 1 should be frozen");
                QUnit.assert.ok(Object.isFrozen(inst2), "Instance 2 should be frozen");
                QUnit.assert.equal(inst1.getValue(), "FrozenBase>FrozenChild", "Frozen instance 1 resolves correctly");
                QUnit.assert.equal(inst2.getValue(), "FrozenBase>FrozenChild", "Frozen instance 2 resolves correctly");
                // Cached
                QUnit.assert.equal(inst1.getValue(), "FrozenBase>FrozenChild", "Frozen instance 1 cached resolves correctly");
                QUnit.assert.equal(inst2.getValue(), "FrozenBase>FrozenChild", "Frozen instance 2 cached resolves correctly");
            }
        });

        this.testCase({
            name: "Dynamic re-registration: calling dynamicProto again updates resolved function",
            test: () => {
                let inst = new ReRegistrableBase();
                QUnit.assert.equal(inst.getValue(), "Base:v1", "Initial call resolves to v1");
                // Call again to populate cache
                QUnit.assert.equal(inst.getValue(), "Base:v1", "Second call resolves to v1 (cached)");

                // Re-register with a new implementation
                inst.reRegister();
                QUnit.assert.equal(inst.getValue(), "Base:v2", "After re-registration should resolve to v2, not stale cached v1");
                // Verify cache is updated
                QUnit.assert.equal(inst.getValue(), "Base:v2", "Repeated call after re-registration should still resolve to v2");
            }
        });

        this.testCase({
            name: "Dynamic re-registration: re-registration on base does not affect other instances",
            test: () => {
                let inst1 = new ReRegistrableBase();
                let inst2 = new ReRegistrableBase();
                QUnit.assert.equal(inst1.getValue(), "Base:v1", "Instance 1 initial");
                QUnit.assert.equal(inst2.getValue(), "Base:v1", "Instance 2 initial");

                inst1.reRegister();
                QUnit.assert.equal(inst1.getValue(), "Base:v2", "Instance 1 updated to v2");
                QUnit.assert.equal(inst2.getValue(), "Base:v1", "Instance 2 still v1");
            }
        });

        this.testCase({
            name: "Dynamic re-registration: child class base proxy is early-bound at construction",
            test: () => {
                let inst = new ReRegistrableChild();
                QUnit.assert.equal(inst.getValue(), "Base:v1>Child", "Initial child call chains correctly");
                QUnit.assert.equal(inst.getValue(), "Base:v1>Child", "Cached child call chains correctly");

                // Re-register the base - child's base.getValue() was captured at construction time
                // via _instFuncProxy, so it still references the original base function
                inst.reRegister();
                QUnit.assert.equal(inst.getValue(), "Base:v1>Child", "Child base proxy is early-bound, still chains with original base");
                QUnit.assert.equal(inst.getValue(), "Base:v1>Child", "Repeated call confirms early-bound base");
            }
        });

        this.testCase({
            name: "Dynamic re-registration (no setInstFuncs): re-registration updates without instance shortcut",
            test: () => {
                let inst = new ReRegistrableNoInstBase();
                QUnit.assert.equal(inst.getValue(), "Base:v1", "Initial call resolves to v1");
                QUnit.assert.equal(inst.getValue(), "Base:v1", "Cached call resolves to v1");

                inst.reRegister();
                QUnit.assert.equal(inst.getValue(), "Base:v2", "After re-registration should resolve to v2");
                QUnit.assert.equal(inst.getValue(), "Base:v2", "Cached call after re-registration resolves to v2");
            }
        });

        this.testCase({
            name: "Dynamic re-registration (no setInstFuncs): child sees updated base via late-bound proxy",
            test: () => {
                let inst = new ReRegistrableNoInstChild();
                QUnit.assert.equal(inst.getValue(), "Base:v1>Child", "Initial child call");
                QUnit.assert.equal(inst.getValue(), "Base:v1>Child", "Cached child call");

                // With setInstFuncs:false, the base proxy captures the dynamic proxy (late-bound),
                // so re-registration of the base IS visible through the child's base.getValue()
                inst.reRegister();
                QUnit.assert.equal(inst.getValue(), "Base:v2>Child", "Child sees updated base via late-bound proxy");
                QUnit.assert.equal(inst.getValue(), "Base:v2>Child", "Repeated call confirms updated base");
            }
        });

        this.testCase({
            name: "Multiple dynamicProto calls in constructor: last registration wins",
            test: () => {
                let inst = new MultiDynProtoBase();
                QUnit.assert.equal(inst.getA(), "A:v2", "getA should be from second dynamicProto call");
                QUnit.assert.equal(inst.getB(), "B:v1", "getB should be from second dynamicProto call");
                // Cached calls
                QUnit.assert.equal(inst.getA(), "A:v2", "Cached getA should still be v2");
                QUnit.assert.equal(inst.getB(), "B:v1", "Cached getB should still be v1");
            }
        });
    }
}
