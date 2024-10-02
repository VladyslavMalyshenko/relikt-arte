import { Category, MainCategory } from "../types/categoriesTypes";

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
        filters: [
            {
                name: "Активні елементи",
                field: "active",
                choices: [
                    { name: "Лише активні", value: true },
                    { name: "Лише неактивні", value: false },
                ],
            },
        ],
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
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                version="1.1"
                viewBox="0 0 297.006 297.006"
                enableBackground="new 0 0 297.006 297.006"
            >
                <path d="m148.503,37.143c-3.866,0-7,3.134-7,7v4.5c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-4.5c0-3.867-3.134-7-7-7z" />
                <path d="m148.503,182.986c-3.866,0-7,3.134-7,7v8.425c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-8.425c0-3.866-3.134-7-7-7z" />
                <path d="m148.503,145.544c-3.866,0-7,3.134-7,7v8.425c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-8.425c0-3.866-3.134-7-7-7z" />
                <path d="m148.503,70.66c-3.866,0-7,3.134-7,7v8.425c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-8.425c0-3.866-3.134-7-7-7z" />
                <path d="m148.503,108.103c-3.866,0-7,3.134-7,7v8.424c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-8.424c0-3.867-3.134-7-7-7z" />
                <path d="m148.503,220.429c-3.866,0-7,3.134-7,7v4.5c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-4.5c0-3.866-3.134-7-7-7z" />
                <path d="m268.003,204.856c-22.726,0-41.214-26.146-41.214-58.285 0-32.139 18.488-58.286 41.214-58.286 3.62,0 6.957-1.956 8.726-5.115 1.768-3.159 1.691-7.026-0.201-10.112l-27.071-44.143c-1.601-2.61-4.309-4.344-7.351-4.703-3.042-0.362-6.078,0.694-8.245,2.859-9.414,9.414-24.73,9.412-34.143,0-4.56-4.559-7.071-10.623-7.072-17.072-0.001-5.522-4.478-9.999-10-9.999h-68.286c-5.522,0-9.999,4.477-10,9.999-0.001,6.449-2.513,12.513-7.072,17.072-9.412,9.414-24.73,9.412-34.143,0-2.167-2.165-5.209-3.221-8.245-2.859-3.041,0.359-5.75,2.093-7.351,4.703l-27.07,44.143c-1.893,3.086-1.97,6.953-0.201,10.112 1.769,3.159 5.106,5.115 8.726,5.115 22.726,0 41.214,26.147 41.214,58.286 0,32.139-18.488,58.285-41.214,58.285-3.41,0-6.585,1.738-8.423,4.61-1.839,2.872-2.086,6.483-0.657,9.58l17.071,36.992c1.861,4.032 6.158,6.359 10.549,5.701 0.709-0.104 71.307-10.089 91.422,29.771 1.685,3.339 5.092,5.459 8.831,5.495 0.032,0 0.064,0 0.097,0 3.702,0 7.105-2.047 8.839-5.323 21.623-40.866 92.279-32.842 92.99-32.756 4.199,0.513 8.263-1.672 10.154-5.455l17.071-34.144c1.55-3.1 1.384-6.781-0.438-9.729-1.822-2.947-5.041-4.742-8.507-4.742zm-22.988,33.619c-18.797-1.097-69.54-0.796-97.039,30.834-21.16-24.353-57.333-28.774-80.819-28.774-5.979,0-11.134,0.287-15.011,0.604l-8.528-18.48c11.223-3.454 21.427-10.904 29.6-21.802 10.963-14.617 17-33.895 17-54.285 0-20.39-6.037-39.668-17-54.285-7.788-10.384-17.417-17.638-28.017-21.287l13.7-22.34c16.773,9.24 38.326,6.756 52.529-7.446 5.927-5.927 9.961-13.243 11.798-21.214h50.549c1.837,7.971 5.871,15.287 11.798,21.214 14.204,14.203 35.756,16.686 52.529,7.446l13.7,22.34c-10.6,3.649-20.229,10.903-28.016,21.286-10.963,14.617-17,33.896-17,54.285 0,20.39 6.037,39.668 17,54.285 8.075,10.767 18.131,18.168 29.195,21.676l-7.968,15.943z" />
            </svg>
        ),
        label: "Покриття",
        link: "/product_covering",
        addUrl: "/api/v1/product/related/product_covering/create/",
        getUrl: "/api/v1/product/related/product_covering/list/",
        editUrl: "/api/v1/product/related/product_covering/$id/update/",
        deleteUrl: "/api/v1/product/related/product_covering/$id/delete/",
        getItemUrl: "/api/v1/product/related/product_covering/$id/",
        filters: [
            {
                name: "Активні елементи",
                field: "active",
                choices: [
                    { name: "Лише активні", value: true },
                    { name: "Лише неактивні", value: false },
                ],
            },
        ],
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
                viewBox="-7.82 0 122.88 122.88"
            >
                <path
                    style={{ fillRule: "evenodd" }}
                    d="M4.21,0H103a4.22,4.22,0,0,1,4.21,4.21V118.67a4.23,4.23,0,0,1-4.21,4.21H4.21A4.23,4.23,0,0,1,0,118.67V4.21A4.23,4.23,0,0,1,4.21,0ZM69,80.67a1.8,1.8,0,0,1,2.12,2.9l-4.87,3.59a1.8,1.8,0,0,1-2.12-2.9L69,80.67Zm19.12-16a1.8,1.8,0,1,1,2.33,2.74L75.9,79.72A1.8,1.8,0,1,1,73.58,77L88.11,64.65ZM89,78.92A1.79,1.79,0,1,1,91.3,81.7L68.41,100.39a1.79,1.79,0,1,1-2.26-2.78L89,78.92ZM37.18,42.55a1.8,1.8,0,1,1-2.13-2.9l4.87-3.59A1.8,1.8,0,1,1,42,39l-4.86,3.59Zm-19.13,16a1.8,1.8,0,1,1-2.32-2.74L30.26,43.5a1.8,1.8,0,0,1,2.32,2.74L18.05,58.57ZM17.13,44.3a1.79,1.79,0,0,1-2.26-2.78L37.75,22.83A1.79,1.79,0,1,1,40,25.61L17.13,44.3Zm-8.76-36H49.5V114.61H8.37V8.27Zm49.36,0H98.86V114.61H57.73V8.27Z"
                />
            </svg>
        ),
        label: "Кольори скла",
        link: "/product_glass_color",
        addUrl: "/api/v1/product/related/product_glass_color/create/",
        getUrl: "/api/v1/product/related/product_glass_color/list/",
        editUrl: "/api/v1/product/related/product_glass_color/$id/update/",
        deleteUrl: "/api/v1/product/related/product_glass_color/$id/delete/",
        getItemUrl: "/api/v1/product/related/product_glass_color/$id/",
        filters: [
            {
                name: "Активні елементи",
                field: "active",
                choices: [
                    { name: "Лише активні", value: true },
                    { name: "Лише неактивні", value: false },
                ],
            },
        ],
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
        filters: [
            {
                name: "висота",
                field: "height",
                type: "from-to",
            },
            {
                name: "довжина",
                field: "width",
                type: "from-to",
            },
            {
                name: "товщина",
                field: "thickness",
                type: "from-to",
            },
        ],
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
                name: "товщина",
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
                name: "товщина",
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
                name: "товщина",
                field_name: "thickness",
                type: "number",
            },
        ],
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
            >
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
        filters: [
            {
                name: "наявність скла",
                field: "is_glass_available",
                type: "radio",
                choices: [
                    { name: "Присутнє", value: true },
                    { name: "Відсутнє", value: false },
                ],
            },
            {
                name: "наявність матеріалу",
                field: "have_material_choice",
                type: "radio",
                choices: [
                    { name: "Присутній", value: true },
                    { name: "Відсутній", value: false },
                ],
            },
            {
                name: "вибір сторони",
                field: "have_orientation_choice",
                type: "radio",
                choices: [
                    { name: "Вибір є", value: true },
                    { name: "Немає вибору", value: false },
                ],
            },
            {
                name: "вибір лиштви",
                field: "have_type_of_platband_choice",
                type: "radio",
                choices: [
                    { name: "Вибір є", value: true },
                    { name: "Немає вибору", value: false },
                ],
            },
        ],
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 5H14C15.1046 5 16 5.89543 16 7V14C16 15.1046 15.1046 16 14 16H7C5.89543 16 5 15.1046 5 14V7C5 5.89543 5.89543 5 7 5zM3 11H2C0.89543 11 0 10.1046 0 9V2C0 0.89543 0.89543 0 2 0H9C10.1046 0 11 0.89543 11 2V3H7C4.79086 3 3 4.79086 3 7V11z"
                    fill="currentColor"
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
        filters: [
            {
                name: "ціна",
                field: "price",
                type: "from-to",
            },
            {
                name: "наявність скла",
                field: "have_glass",
                type: "radio",
                choices: [
                    { name: "Присутнє", value: true },
                    { name: "Відсутнє", value: false },
                ],
            },
            {
                name: "вибір сторони",
                field: "orientation_choice",
                type: "radio",
                choices: [
                    { name: "Присутній", value: true },
                    { name: "Відсутній", value: false },
                ],
            },
            {
                name: "вибір матеріалу",
                field: "material_choice",
                type: "radio",
                choices: [
                    { name: "Присутній", value: true },
                    { name: "Відсутній", value: false },
                ],
            },
        ],
        fields: [
            "id",
            { name: "артикул", field: "sku" },
            {
                name: "назва",
                field: "name",
            },
            { name: "ціна", field: "price" },
            {
                name: "наявність скла",
                field: "have_glass",
            },
            {
                name: "вибір сторони",
                field: "orientation_choice",
            },
            {
                name: "вибір матеріалу",
                field: "material_choice",
            },
            {
                name: "вибір типу лиштви",
                field: "type_of_platband_choice",
            },
        ],
        addItemFields: [
            {
                name: "артикул",
                field_name: "sku",
                type: "text",
                required: true,
            },
            {
                name: "назва",
                field_name: "name",
                type: "text",
                required: true,
            },
            {
                name: "Зображення",
                field_name: "file_",
                type: "product-image",
                postUrl: "/api/v1/product/add_photo/$id/",
                getUrl: "/api/v1/product/$id",
                updateUrl: "/api/v1/product/update_photo/$id/",
            },
            {
                name: "ціна",
                field_name: "price",
                type: "number",
                required: true,
            },
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
                required: true,
            },
            {
                name: "вибір сторони",
                field_name: "orientation_choice",
                type: "checkbox",
                required: true,
            },
            {
                name: "вибір матеріалу",
                field_name: "material_choice",
                type: "checkbox",
                required: true,
            },
            {
                name: "вибір типу лиштви",
                field_name: "type_of_platband_choice",
                type: "checkbox",
                required: true,
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
                    {
                        dependOn: "have_material_choice",
                        target: "material_choice",
                    },
                    {
                        dependOn: "have_type_of_platband_choice",
                        target: "type_of_platband_choice",
                    },
                ],
                labelField: "name",
                required: true,
            },
            {
                name: "покриття товару",
                field_name: "covering_id",
                type: "list-radio",
                getUrl: "/api/v1/product/related/product_covering/list/",
                labelField: "name",
            },
        ],
        inputFields: [
            {
                name: "id",
                type: "text",
            },
            {
                name: "артикул",
                field_name: "sku",
                type: "text",
                required: true,
            },
            {
                name: "назва",
                field_name: "name",
                type: "text",
                required: true,
            },
            {
                name: "Зображення",
                field_name: "file_",
                type: "product-image",
                postUrl: "/api/v1/product/add_photo/$id/",
                getUrl: "/api/v1/product/$id",
                updateUrl: "/api/v1/product/update_photo/$id/",
            },
            {
                name: "ціна",
                field_name: "price",
                type: "number",
                required: true,
            },
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
                required: true,
            },
            {
                name: "вибір сторони",
                field_name: "orientation_choice",
                type: "checkbox",
                required: true,
            },
            {
                name: "вибір матеріалу",
                field_name: "material_choice",
                type: "checkbox",
                required: true,
            },
            {
                name: "вибір типу лиштви",
                field_name: "type_of_platband_choice",
                type: "checkbox",
                required: true,
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
                    {
                        dependOn: "have_material_choice",
                        target: "material_choice",
                    },
                    {
                        dependOn: "have_type_of_platband_choice",
                        target: "type_of_platband_choice",
                    },
                ],
                labelField: "name",
                required: true,
            },
            {
                name: "покриття товару",
                field_name: "covering_id",
                type: "list-radio",
                getUrl: "/api/v1/product/related/product_covering/list/",
                labelField: "name",
            },
        ],
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 200.688 200.688"
                xmlSpace="preserve"
                fill="currentColor"
            >
                <path d="M190.985,111.644l-0.293-0.347c-1.399-1.729-4.459-4.187-8.922-5.891l-0.684-0.208   c-4.649-2.144-8.861-3.582-10.096-3.987c-0.97-0.319-1.782-0.666-2.43-0.948c-5.128-2.53-5.708-4.008-5.791-4.237l-0.233-0.544   l0.197-0.49c3.811-4.746,6.488-10.275,7.508-15.486l0.15-0.354c1.052-1.342,1.725-2.91,1.993-4.638   c1.213-4.384,1.263-7.605,0.175-9.863l-0.097-0.2l0.05-0.222c1.353-5.665,2.656-16.277-3.847-23.681   c-1.038-1.303-5.025-5.705-12.759-7.97l-3.772-1.292c-6.181-1.904-10.089-2.362-10.74-2.373c-0.412,0-0.78,0.05-1.317,0.168   l-0.465,0.093c-0.272-0.043-0.555-0.068-0.873-0.068c-2.069,0-4.305,0.909-4.305,0.909c-2.18,0.916-13.252,6.023-16.763,16.874   c-0.583,1.542-1.772,6.231-0.233,16.488l0.039,0.254l-0.161,0.215c-1.578,2.126-1.711,5.572-0.397,10.203   c0.344,2.051,1.013,3.69,1.997,4.924l0.165,0.347c0.97,5.372,3.357,10.665,6.904,15.317l0.283,0.376l-0.265,0.376   c-0.154,0.229-0.261,0.465-0.301,0.637c-0.544,1.553-4.706,4.012-11.159,6.596c-1.442-0.523-2.444-0.852-2.799-0.97   c-1.306-0.437-2.398-0.905-3.282-1.292c-6.825-3.368-7.723-5.332-7.859-5.783l-0.358-0.798l0.315-0.741   c5.121-6.381,8.715-13.811,10.096-20.843l0.211-0.483c1.417-1.8,2.323-3.905,2.663-6.199c1.628-5.866,1.714-10.182,0.247-13.192   l-0.161-0.319l0.086-0.344c1.822-7.609,3.568-21.845-5.161-31.762c-1.385-1.736-6.703-7.641-17.096-10.683l-5.078-1.743   C77.89,4.865,72.629,4.296,71.946,4.289c-0.558,0-1.041,0.061-1.746,0.229l-0.68,0.111c-2.813-0.455-6.27,0.88-6.896,1.124   c-2.928,1.228-17.769,8.092-22.475,22.643c-0.784,2.061-2.373,8.346-0.308,22.114l0.061,0.415l-0.258,0.344   c-2.104,2.813-2.265,7.412-0.501,13.621c0.451,2.734,1.346,4.917,2.673,6.589l0.233,0.49c1.285,7.208,4.491,14.326,9.266,20.593   l0.447,0.583l-0.426,0.616c-0.208,0.304-0.347,0.616-0.379,0.812c-1.185,3.375-14.394,9.276-25.968,12.809   c-8.332,3.157-11.989,8.271-12.011,8.303C1.503,132.72,0.05,169.292,0,170.863c0.179,9.513,4.499,11.445,5.329,11.724l0.73,0.319   c25.385,11.077,62.462,13.235,66.61,13.446l1.296,0.039c1.238,0,2.494-0.068,3.672-0.132l0.104-0.004l0.383,0.029   c0.308,0.075,0.558,0.115,0.816,0.115h0.004l0.175-0.007c1.678-0.086,41.486-2.348,66.327-13.496   c1.356-0.358,5.737-2.24,6.131-11.488c8.858-0.766,30.048-3.207,44.439-9.659c1.066-0.279,4.556-1.761,4.674-9.273   C200.527,149.587,199.142,123.776,190.985,111.644z M55.104,98.377l0.691-0.644l0.687,0.644c6.077,5.726,12.809,8.872,18.936,8.872   c6.438,0,13.084-2.792,19.218-8.081l0.519-0.437L96.5,99.39c1.145,1.041,3.196,2.537,4.116,2.988l1.267,0.619l-0.136,0.129   l0.487,0.293c1.16,0.684,2.394,1.353,3.804,2.054c1.428,0.633,2.652,1.109,3.951,1.539c0.254,0.086,6.317,2.044,13.227,5.243   l1.235,0.383c6.567,2.502,9.344,6.027,9.445,6.148c10.193,15.131,11.907,48.157,12.075,51.85c-0.079,5.161-1.55,6.499-1.933,6.757   c-22.844,10.225-57.355,12.884-64.033,13.31l-0.186,0.011l-0.19-0.057c-0.225-0.068-0.455-0.1-0.741-0.1h-0.007l-0.236,0.011   c-1.825,0.125-3.335,0.186-4.746,0.186h-1.106c-4.159-0.251-41.372-2.688-65.189-13.285c-0.48-0.2-1.886-1.825-1.99-6.571   c0.004-0.354,1.228-36.003,11.925-51.893c0.523-0.659,3.432-4.048,9.244-6.267c5.107-1.571,17.751-5.762,24.665-10.769   c0.29-0.175,0.576-0.469,0.884-0.784C52.838,100.639,53.89,99.508,55.104,98.377z M126.273,107.299l-0.945-0.276   c-1.553-0.716-3.182-1.424-4.867-2.115c2.38-1.113,4.327-2.205,5.773-3.26c0.233-0.136,0.465-0.372,0.684-0.601   c0.523-0.562,1.228-1.317,2.051-2.086l0.44-0.404l0.422,0.412c4.549,4.273,9.573,6.617,14.144,6.617   c4.817,0,9.781-2.083,14.351-6.027l0.326-0.276l0.923,0.447c0.841,0.784,2.373,1.886,3.056,2.226l0.798,0.379l-0.097,0.097   l0.501,0.293c0.87,0.519,1.8,1.013,2.842,1.528c1.07,0.472,1.979,0.83,2.942,1.152c0.186,0.061,4.656,1.496,9.824,3.89l0.909,0.279   c4.706,1.8,6.753,4.27,6.95,4.527c7.605,11.273,8.833,35.71,8.944,38.433c-0.054,3.779-1.102,4.746-1.364,4.917   c-14.308,6.403-34.851,8.808-43.49,9.566c-0.777-11.216-3.547-37.632-12.787-51.371l-0.39-0.469   C136.34,112.868,132.239,109.583,126.273,107.299z M120.922,66.479l0.161-0.19c0.723-0.53,1.077-1.349,0.941-2.197   c-1.718-10.318-0.601-14.648-0.218-15.74c2.996-9.187,12.419-13.474,14.272-14.233c0.372-0.143,1.092-0.358,1.854-0.487   l0.229-0.054l1.421-0.075l0.011,0.097l0.429-0.039c0.319-0.025,0.626-0.075,0.841-0.122l0.48-0.107   c0.304,0.007,4.026,0.49,9.42,2.144l3.804,1.306c6.907,2.04,10.107,5.851,10.697,6.621c5.551,6.299,4.062,15.776,2.677,20.868   c-0.157,0.626-0.061,1.27,0.297,1.797l0.308,0.397c0.39,0.523,0.744,2.602-0.458,7.083c-0.225,1.36-0.73,2.452-1.453,3.178   c-0.293,0.308-0.49,0.709-0.562,1.167c-1.872,10.998-11.721,23.291-22.096,23.291c-8.811,0-18.857-11.316-20.664-23.291   c-0.075-0.455-0.268-0.855-0.587-1.217c-0.737-0.762-1.213-1.875-1.507-3.554C120.35,70.008,120.253,67.492,120.922,66.479z    M44.249,54.626l0.24-0.276c0.931-0.669,1.381-1.721,1.21-2.809c-2.33-13.986-0.809-19.805-0.286-21.266   C49.46,17.853,62.215,12.045,64.72,11.014c0.523-0.2,1.496-0.494,2.527-0.662l0.276-0.064l2.101-0.115l0.007,0.132l0.451-0.043   c0.419-0.039,0.83-0.104,1.31-0.2l0.48-0.111c0.39,0.004,5.315,0.623,12.741,2.899l5.107,1.757   c9.334,2.759,13.682,7.924,14.48,8.958c7.508,8.521,5.504,21.344,3.643,28.234c-0.218,0.795-0.086,1.621,0.369,2.294l0.415,0.533   c0.684,0.916,0.941,3.983-0.587,9.663c-0.308,1.854-0.998,3.357-2.008,4.355c-0.369,0.394-0.608,0.909-0.712,1.492   c-2.541,14.87-15.869,31.497-29.905,31.497c-11.928,0-25.528-15.303-27.983-31.487c-0.082-0.583-0.322-1.109-0.744-1.568   c-1.024-1.056-1.671-2.577-2.069-4.839C43.437,59.479,43.315,56.054,44.249,54.626z" />
            </svg>
        ),
        label: "Користувачі",
        link: "/users",
        addUrl: "/api/v1/user/create?send_confirmation_email=false",
        getUrl: "/api/v1/user/list/",
        editUrl: "/api/v1/user/update_from_admin/$id/",
        deleteUrl: "/api/v1/user/delete/$id/",
        getItemUrl: "/api/v1/user/get/$id/",
        filters: [
            {
                name: "Чи адмнін",
                field: "is_admin",
                type: "radio",
                choices: [
                    { name: "Так", value: true },
                    { name: "Ні", value: false },
                ],
            },
            {
                name: "Чи активний",
                field: "is_active",
                type: "radio",
                choices: [
                    { name: "Так", value: true },
                    { name: "Ні", value: false },
                ],
            },
        ],
        fields: [
            "id",
            {
                name: "Пошта",
                field: "email",
            },
            {
                name: "адмін",
                field: "is_admin",
            },
            {
                name: "активний",
                field: "is_active",
            },
        ],
        addItemFields: [
            {
                name: "Ім'я",
                field_name: "full_name",
                type: "text",
            },
            {
                name: "Пошта",
                field_name: "email",
                type: "text",
                required: true,
            },
            {
                name: "Номер телефону",
                field_name: "phone",
                type: "text",
                required: true,
            },
            {
                name: "Пароль",
                field_name: "password",
                type: "text",
                required: true,
            },
            {
                name: "Повторний пароль",
                field_name: "password_confirm",
                type: "text",
                required: true,
            },
            {
                name: "Адмін",
                field_name: "as_admin",
                type: "checkbox",
                required: true,
            },
            {
                name: "Активний",
                field_name: "is_active",
                type: "checkbox",
                required: true,
            },
        ],
        inputFields: [
            {
                name: "id",
                type: "text",
            },
            {
                name: "Ім'я",
                field_name: "full_name",
                type: "text",
            },
            {
                name: "Пошта",
                field_name: "email",
                type: "text",
                required: true,
            },
            {
                name: "Номер телефону",
                field_name: "phone",
                type: "text",
                required: true,
            },
            {
                name: "Новий пароль",
                field_name: "new_password",
                type: "text",
            },
            {
                name: "Адмін",
                field_name: "is_admin",
                type: "checkbox",
                required: true,
            },
            {
                name: "Активний",
                field_name: "is_active",
                type: "checkbox",
                required: true,
            },
        ],
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
            >
                <rect
                    x="5"
                    y="4"
                    width="14"
                    height="17"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M9 9H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M9 13H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M9 17H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        ),
        label: "Замовлення",
        link: "/orders",
        getUrl: "/api/v1/order/list/",
        editUrl: "/api/v1/order/update/$id/",
        deleteUrl: "/api/v1/order/delete/$id/",
        getItemUrl: "/api/v1/order/$id/",
        filters: [
            {
                name: "Статус замовлення",
                field: "status",
                type: "radio",
                choices: [
                    { name: "Очікує обробки", value: "new" },
                    { name: "В обробці", value: "accepted" },
                    {
                        name: "Готовий до відправки",
                        value: "ready_for_shipment",
                    },
                ],
            },
        ],
        fields: [
            "id",
            {
                name: "Ім'я",
                field: "full_name",
            },
            {
                name: "Область",
                field: "region",
            },
            {
                name: "Населений пункт",
                field: "city_or_settlement",
            },
            {
                name: "Відділення",
                field: "warehouse",
            },
            {
                name: "Статус",
                field: "status",
                valueNames: {
                    new: "Очікує обробки",
                    accepted: "В обробці",
                    ready_for_shipment: "Готовий до відправки",
                },
            },
        ],
        addItemFields: [],
        inputFields: [
            {
                name: "id",
                type: "text",
            },
            {
                name: "Статус",
                field_name: "status",
                type: "list-radio",
                value: [
                    { name: "Очікує обробки", value: "new" },
                    { name: "В обробці", value: "accepted" },
                    {
                        name: "Готовий до відправки",
                        value: "ready_for_shipment",
                    },
                ],
                labelField: "name",
            },
            {
                name: "Ім'я",
                field_name: "full_name",
                type: "text",
                locked: true,
            },
            {
                name: "Номер телефону",
                field_name: "phone",
                type: "text",
                locked: true,
            },
            {
                name: "Email",
                field_name: "email",
                type: "text",
                locked: true,
            },
            {
                name: "Область",
                field_name: "region",
                type: "text",
                locked: true,
            },
            {
                name: "Населений пункт",
                field_name: "city_or_settlement",
                type: "text",
                locked: true,
            },
            {
                name: "Відділення",
                field_name: "warehouse",
                type: "text",
                locked: true,
            },
            {
                name: "Речі",
                field_name: "items",
                type: "order-items",
            },
        ],
    },
];
