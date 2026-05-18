import { DynamicProtoDefaultTests } from '../DynamicProto.Tests';
import { DynamicProtoMultipleCallTests } from '../DynamicProtoMultipleCall.Tests';
import { DynamicProtoNoInstTests } from '../DynamicProtoNoInst.Tests';
import { DynamicProtoMultipleNoInstTests } from '../DynamicProtoMultipleNoInst.Tests';
import { SecurityCheckTests } from '../SecurityCheck.Tests';
import { DynamicProtoDeepHierarchyTests } from '../DynamicProtoDeepHierarchy.Tests';

export function runTests() {
    new DynamicProtoDefaultTests("Default").registerTests();
    new DynamicProtoMultipleCallTests("Multiple").registerTests();
    new DynamicProtoNoInstTests("SetInst").registerTests();
    new DynamicProtoMultipleNoInstTests("Multiple SetInst").registerTests();
    new SecurityCheckTests("Security Checks").registerTests();
    new DynamicProtoDeepHierarchyTests("Deep Hierarchy & Caching").registerTests();
}
