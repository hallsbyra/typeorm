import "reflect-metadata";
import {createTestingConnections, closeTestingConnections, reloadTestingDatabases} from "../../utils/test-utils";
import {Connection} from "../../../src/connection/Connection";
import {expect} from "chai";
import { EntityA } from "./entity/EntityA";

describe("github issues > #2871 empty enum array is returned as array with single empty string", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should return an empty array of enums", () => Promise.all(connections.map(async connection => {
        // Given
        const e1 = new EntityA();
        e1.id = "1";
        e1.values = [];
        await connection.manager.save(e1);

        // When
        const e2 = await connection.manager.findOneOrFail(EntityA, "1");

        // Then
        expect(e2.values.length).to.eq(0);
    })));


});