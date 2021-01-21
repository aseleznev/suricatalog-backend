import { DefaultNamingStrategy, Table, NamingStrategyInterface } from 'typeorm';

export class TypeormNamingStrategy
    extends DefaultNamingStrategy
    implements NamingStrategyInterface {
    foreignKeyName(
        tableOrName: Table | string,
        columnNames: string[],
        referencedTablePath?: string,
        referencedColumnNames?: string[]
    ): string {
        tableOrName =
            typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

        const name = columnNames.reduce(
            (name, column) => `${name}_${column}`,
            `${tableOrName}_${referencedTablePath}`
        );

        return `FK_${name}`;
    }
}
