export type Filter = {
    name: string;
    field: string;
    targetKey?: string;
    options?: any[];
    optionsUrl?: string;
};

export const filtersData: Filter[] = [
    {
        name: "Категорія",
        field: "category_id",
        targetKey: "name",
        optionsUrl: "api/v1/product/category/list",
    },
    {
        name: "Наявність скла",
        field: "have_glass",
        options: [
            { name: "Присутнє", value: true },
            { name: "Відсутнє", value: false },
        ],
    },
    {
        name: "Сторона петель",
        field: "orientation_choice",
        options: [
            { name: "Ліва", value: "left" },
            { name: "Права", value: "right" },
        ],
    },
];
