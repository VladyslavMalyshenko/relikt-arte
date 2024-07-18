export type Category = {
  icon: JSX.Element;
  label: string;
  link: string;
  addUrl: string;
  getUrl: string;
  editUrl: string;
  deleteUrl: string;
  getItemUrl: string;
  fields?: any[];
  addItemFields: any[];
  inputFields: any[];
};

export type MainCategory = {
  icon: JSX.Element;
  label: string;
  link: string;
  main: boolean;
};

export const categoriesData: (MainCategory | Category)[] = [
  {
    icon: (
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        fill="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M924.8 385.6a446.7 446.7 0 00-96-142.4 446.7 446.7 0 00-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 00-142.4 96 446.7 446.7 0 00-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 01140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 00-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 000 79.2 55.95 55.95 0 0079.2 0 55.87 55.87 0 0014.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 00-11.3 0l-56.6 56.6a8.03 8.03 0 000 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 00-11.3 0l-31.1 31.1a8.03 8.03 0 000 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z"></path>
      </svg>
    ),
    label: "Дешборд",
    link: "/",
    main: true,
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        fill="currentColor"
        viewBox="0 0 458.178 458.178"
        xmlSpace="preserve"
      >
        <path d="M130.415,277.741C95.083,313.074,45.038,324.723,0,312.697c5.918,22.164,17.568,43.116,34.956,60.504   c52.721,52.721,138.198,52.721,190.919,0c26.361-26.36,26.36-69.099,0-95.459C199.514,251.38,156.776,251.38,130.415,277.741z" />
        <path d="M212.771,234.276c12.728,4.827,24.403,12.338,34.317,22.252c10.077,10.077,17.456,21.838,22.19,34.378l53.47-53.47   l-56.568-56.569C245.886,201.161,226.908,220.139,212.771,234.276z" />
        <path d="M446.462,57.153c-15.621-15.621-40.948-15.621-56.568,0c-5.887,5.887-54.496,54.496-102.501,102.501l56.568,56.569   l102.501-102.501C462.083,98.101,462.083,72.774,446.462,57.153z" />
      </svg>
    ),
    label: "Кольори",
    link: "/product_colors",
    addUrl: "/api/v1/product/related/product_color/create/",
    getUrl: "/api/v1/product/related/product_color/list/",
    editUrl: "/api/v1/product/related/product_color/$id/update/",
    deleteUrl: "/api/v1/product/related/product_color/$id/delete/",
    getItemUrl: "/api/v1/product/related/product_color/$id/",
    fields: [
      "id",
      { name: "назва", field: "name" },
      { name: "активний", field: "active" },
    ],
    addItemFields: [
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "active",
        type: "checkbox",
      },
    ],
    inputFields: [
      {
        name: "id",
        type: "text",
      },
      {
        name: "name",
        type: "text",
      },
      {
        name: "active",
        type: "checkbox",
      },
    ],
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 32 32"
        version="1.1"
      >
        <path d="M11.975 10.838l-0.021-7.219c-0.009-0.404-0.344-0.644-0.748-0.654l-0.513-0.001c-0.405-0.009-0.725 0.343-0.716 0.747l0.028 4.851-8.321-8.242c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l8.285 8.207-4.721 0.012c-0.404-0.009-0.779 0.27-0.84 0.746l0.001 0.513c0.010 0.405 0.344 0.739 0.748 0.748l7.172-0.031c0.008 0.001 0.013 0.003 0.020 0.003l0.366 0.008c0.201 0.005 0.383-0.074 0.512-0.205 0.132-0.13 0.178-0.311 0.175-0.514l-0.040-0.366c0.001-0.007 0.027-0.012 0.027-0.019zM20.187 11.736c0.129 0.13 0.311 0.21 0.512 0.205l0.366-0.008c0.007 0 0.012-0.002 0.020-0.004l7.172 0.031c0.404-0.009 0.738-0.344 0.747-0.748l0.001-0.513c-0.061-0.476-0.436-0.755-0.84-0.746l-4.721-0.012 8.285-8.207c0.391-0.391 0.391-1.024 0-1.414s-1.023-0.391-1.414 0l-8.32 8.241 0.027-4.851c0.009-0.404-0.311-0.756-0.715-0.747l-0.513 0.001c-0.405 0.010-0.739 0.25-0.748 0.654l-0.021 7.219c0 0.007 0.027 0.012 0.027 0.020l-0.040 0.366c-0.005 0.203 0.043 0.384 0.174 0.514zM11.813 20.232c-0.13-0.131-0.311-0.21-0.512-0.205l-0.366 0.009c-0.007 0-0.012 0.003-0.020 0.003l-7.173-0.032c-0.404 0.009-0.738 0.343-0.748 0.747l-0.001 0.514c0.062 0.476 0.436 0.755 0.84 0.745l4.727 0.012-8.29 8.238c-0.391 0.39-0.391 1.023 0 1.414s1.024 0.39 1.414 0l8.321-8.268-0.028 4.878c-0.009 0.404 0.312 0.756 0.716 0.747l0.513-0.001c0.405-0.010 0.739-0.25 0.748-0.654l0.021-7.219c0-0.007-0.027-0.011-0.027-0.019l0.040-0.397c0.005-0.203-0.043-0.384-0.174-0.514zM23.439 22.028l4.727-0.012c0.404 0.009 0.779-0.27 0.84-0.745l-0.001-0.514c-0.010-0.404-0.344-0.739-0.748-0.748h-7.172c-0.008-0-0.013-0.003-0.020-0.003l-0.428-0.009c-0.201-0.006-0.384 0.136-0.512 0.267-0.131 0.13-0.178 0.311-0.174 0.514l0.040 0.366c0 0.008-0.027 0.012-0.027 0.019l0.021 7.219c0.009 0.404 0.343 0.644 0.748 0.654l0.544 0.001c0.404 0.009 0.725-0.343 0.715-0.747l-0.027-4.829 8.352 8.22c0.39 0.391 1.023 0.391 1.414 0s0.391-1.023 0-1.414z" />
      </svg>
    ),
    label: "Розміри",
    link: "/product_sizes",
    addUrl: "/api/v1/product/size/create/",
    getUrl: "/api/v1/product/size/list/",
    editUrl: "/api/v1/product/size/$id/update/",
    deleteUrl: "/api/v1/product/size/$id/delete/",
    getItemUrl: "/api/v1/product/size/$id/",
    fields: [
      "id",
      {
        name: "висота",
        field: "height",
      },
      {
        name: "довжина",
        field: "width",
      },
      {
        name: "ширина",
        field: "thickness",
      },
    ],
    addItemFields: [
      {
        name: "висота",
        field_name: "height",
        type: "number",
        required: true,
      },
      {
        name: "довжина",
        field_name: "width",
        type: "number",
        required: true,
      },
      {
        name: "ширина",
        field_name: "thickness",
        type: "number",
        required: true,
      },
    ],
    inputFields: [
      {
        name: "id",
        type: "text",
      },
      {
        name: "висота",
        field_name: "height",
        type: "number",
      },
      {
        name: "довжина",
        field_name: "width",
        type: "number",
      },
      {
        name: "ширина",
        field_name: "thickness",
        type: "number",
      },
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6C3 4.34315 4.34315 3 6 3H7C8.65685 3 10 4.34315 10 6V7C10 8.65685 8.65685 10 7 10H6C4.34315 10 3 8.65685 3 7V6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M14 6C14 4.34315 15.3431 3 17 3H18C19.6569 3 21 4.34315 21 6V7C21 8.65685 19.6569 10 18 10H17C15.3431 10 14 8.65685 14 7V6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M14 17C14 15.3431 15.3431 14 17 14H18C19.6569 14 21 15.3431 21 17V18C21 19.6569 19.6569 21 18 21H17C15.3431 21 14 19.6569 14 18V17Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M3 17C3 15.3431 4.34315 14 6 14H7C8.65685 14 10 15.3431 10 17V18C10 19.6569 8.65685 21 7 21H6C4.34315 21 3 19.6569 3 18V17Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    label: "Категорії",
    link: "/categories",
    addUrl: "/api/v1/product/category/create/",
    getUrl: "/api/v1/product/category/list/",
    editUrl: "/api/v1/product/category/$id/update/",
    deleteUrl: "/api/v1/product/category/$id/delete/",
    getItemUrl: "/api/v1/product/category/$id/",
    fields: [
      "id",
      { name: "назва", field: "name" },
      {
        name: "наявність скла",
        field: "is_glass_available",
      },
      {
        name: "наявність матеріалу",
        field: "have_material_choice",
      },
      {
        name: "вибір сторони",
        field: "have_orientation_choice",
      },
      {
        name: "вибір лиштви",
        field: "have_type_of_platband_choice",
      },
    ],
    addItemFields: [
      { name: "назва", field_name: "name", type: "text", required: true },
      {
        name: "наявність скла",
        field_name: "is_glass_available",
        type: "checkbox",
      },
      {
        name: "наявність матеріалу",
        field_name: "have_material_choice",
        type: "checkbox",
      },
      {
        name: "вибір сторони",
        field_name: "have_orientation_choice",
        type: "checkbox",
      },
      {
        name: "вибір лиштви",
        field_name: "have_type_of_platband_choice",
        type: "checkbox",
      },
      {
        name: "розміри",
        field_name: "allowed_sizes",
        type: "list",
        getUrl: "/api/v1/product/size/list/",
        labelField: "dimensions",
      },
    ],
    inputFields: [
      {
        name: "id",
        type: "text",
      },
      { name: "назва", field_name: "name", type: "text", required: true },
      {
        name: "наявність скла",
        field_name: "is_glass_available",
        type: "checkbox",
      },
      {
        name: "наявність матеріалу",
        field_name: "have_material_choice",
        type: "checkbox",
      },
      {
        name: "вибір сторони",
        field_name: "have_orientation_choice",
        type: "checkbox",
      },
      {
        name: "вибір лиштви",
        field_name: "have_type_of_platband_choice",
        type: "checkbox",
      },
      {
        name: "розміри",
        field_name: "allowed_sizes",
        type: "list",
        getUrl: "/api/v1/product/size/list/",
        labelField: "dimensions",
      },
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6C3 4.34315 4.34315 3 6 3H7C8.65685 3 10 4.34315 10 6V7C10 8.65685 8.65685 10 7 10H6C4.34315 10 3 8.65685 3 7V6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M14 6C14 4.34315 15.3431 3 17 3H18C19.6569 3 21 4.34315 21 6V7C21 8.65685 19.6569 10 18 10H17C15.3431 10 14 8.65685 14 7V6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M14 17C14 15.3431 15.3431 14 17 14H18C19.6569 14 21 15.3431 21 17V18C21 19.6569 19.6569 21 18 21H17C15.3431 21 14 19.6569 14 18V17Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M3 17C3 15.3431 4.34315 14 6 14H7C8.65685 14 10 15.3431 10 17V18C10 19.6569 8.65685 21 7 21H6C4.34315 21 3 19.6569 3 18V17Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    label: "Продукти",
    link: "/products",
    addUrl: "/api/v1/product/create/",
    getUrl: "/api/v1/product/list/",
    editUrl: "/api/v1/product/$id/update/",
    deleteUrl: "/api/v1/product/$id/delete/",
    getItemUrl: "/api/v1/product/$id/",
    fields: [
      "id",
      { name: "ціна", field: "price" },
      {
        name: "наявність скла",
        field: "have_glass",
      },
      {
        name: "вибір сторони",
        field: "orientation_choice",
      },
    ],
    addItemFields: [
      { name: "ціна", field_name: "price", type: "number", required: true },
      {
        name: "головний текст конструкції",
        field_name: "description.construction.main_text",
        type: "text",
      },
      {
        name: "додатковий текст конструкції",
        field_name: "description.construction.additional_text",
        type: "text",
      },
      {
        name: "переваги",
        field_name: "description.advantages",
        type: "multiple-field",
      },
      {
        name: "головний текст оздоблення",
        field_name: "description.finishing.covering.text",
        type: "text",
      },
      {
        name: "переваги оздоблення",
        field_name: "description.finishing.covering.advantages",
        type: "multiple-field",
      },
      { name: "текст", field_name: "description.text", type: "text" },
      {
        name: "наявність скла",
        field_name: "have_glass",
        type: "checkbox",
      },
      {
        name: "вибір сторони",
        field_name: "orientation_choice",
        type: "checkbox",
      },
      {
        name: "категорія товару",
        field_name: "category_id",
        type: "list-radio",
        getUrl: "/api/v1/product/category/list/",
        getItem: "/api/v1/product/category/$id",
        dependencies: [
          {
            dependOn: "is_glass_available",
            target: "have_glass",
          },
          {
            dependOn: "have_orientation_choice",
            target: "orientation_choice",
          },
        ],
        labelField: "name",
        required: true,
      },
      {
        name: "покриття товару",
        field_name: "covering_id",
        type: "list-radio",
      },
    ],
    inputFields: [
      {
        name: "id",
        type: "text",
      },
      { name: "ціна", field_name: "price", type: "number" },
      {
        name: "головний текст конструкції",
        field_name: "description.construction.main_text",
        type: "text",
      },
      {
        name: "додатковий текст конструкції",
        field_name: "description.construction.additional_text",
        type: "text",
      },
      {
        name: "переваги",
        field_name: "description.advantages",
        type: "multiple-field",
      },
      {
        name: "головний текст оздоблення",
        field_name: "description.finishing.covering.text",
        type: "text",
      },
      {
        name: "переваги оздоблення",
        field_name: "description.finishing.covering.advantages",
        type: "multiple-field",
      },
      { name: "текст", field_name: "description.text", type: "text" },
      {
        name: "наявність скла",
        field_name: "have_glass",
        type: "checkbox",
      },
      {
        name: "вибір сторони",
        field_name: "orientation_choice",
        type: "checkbox",
      },
      {
        name: "категорія товару",
        field_name: "category_id",
        type: "list-radio",
        getUrl: "/api/v1/product/category/list/",
        labelField: "name",
      },
      {
        name: "покриття товару",
        field_name: "covering_id",
        type: "list-radio",
      },
    ],
  },
];
