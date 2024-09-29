export type TableField = {
    name: string;
    field: string;
};

export type InputFieldDependency = {
    dependOn: string;
    target: string;
};

export type InputField = {
    name: string;
    field_name?: string;
    type: string;
    getUrl?: string;
    getItem?: string;
    dependencies?: InputFieldDependency[];
    labelField?: string;
    postUrl?: string;
    updateUrl?: string;
    required?: boolean;
    value?: any;
    locked?: boolean;
};

export type Category = {
    icon: JSX.Element;
    label: string;
    link: string;
    addUrl?: string;
    getUrl: string;
    editUrl: string;
    deleteUrl: string;
    getItemUrl: string;
    fields?: (TableField | string)[];
    filters?: any;
    addItemFields: InputField[];
    inputFields: InputField[];
};

export type MainCategory = {
    icon: JSX.Element;
    label: string;
    link: string;
    main: boolean;
};
