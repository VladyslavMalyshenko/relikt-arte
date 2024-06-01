import { Control, FieldErrors } from "react-hook-form";
import Input from "./Input";

type Field = {
    type: string;
    placeholder: string;
    name: string;
    rules?: any;
};

type FormProps = {
    control: Control<any>;
    errors: FieldErrors<any>;
    fields: Field[];
};

const Form = ({ control, errors, fields }: FormProps) => {
    return (
        <>
            {fields.map((field) => (
                <Input
                    type={field.type}
                    control={control}
                    errors={errors}
                    placeholder={field.placeholder}
                    name={field.name}
                    rules={field.rules}
                />
            ))}
        </>
    );
};

export default Form;
