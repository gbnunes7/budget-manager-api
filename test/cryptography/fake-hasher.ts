import type { HashComparer } from "../../src/domain/budget-manager/application/crypthography/hash-comparer";
import type { HashGenerator } from "../../src/domain/budget-manager/application/crypthography/hash-generator";

export class FakeHasher implements HashGenerator, HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
        return value.concat('-hashed') === hash;
    }
    
    async hash(value: string): Promise<string> {
        return value.concat('-hashed');
    }
}