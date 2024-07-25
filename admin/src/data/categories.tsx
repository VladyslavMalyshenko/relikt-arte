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
        fields: [
            "id",
            { name: "артикул", field: "sku" },
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
            { name: "артикул", field_name: "sku", type: "text" },
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
                getUrl: "/api/v1/product/related/product_covering/list/",
                labelField: "name",
            },
        ],
        inputFields: [
            {
                name: "id",
                type: "text",
            },
            { name: "артикул", field_name: "sku", type: "text" },
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
                getUrl: "/api/v1/product/related/product_covering/list/",
                labelField: "name",
            },
        ],
    },
];
