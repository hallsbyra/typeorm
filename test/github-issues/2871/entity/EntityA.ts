import { Entity, PrimaryColumn, Column } from "../../../../src";

export enum EnumA {
    A,
    B,
}

@Entity()
export class EntityA {
    @PrimaryColumn()
    id: string;

    @Column("enum", {enum: EnumA, array: true, default: () => "array[]::entity_a_values_enum[]"})
    values: EnumA[];
}