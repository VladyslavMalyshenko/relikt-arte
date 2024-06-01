import { useForm } from "react-hook-form";
import "../../../styles/components/UI/Auth.scss";
import "../../../styles/components/pages/passwordrecoverypage/PasswordRecoverySection.scss";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const PasswordRecoverySection = () => {
    interface RecoverFormData {
        email: string;
    }

    const defaultValues = {
        email: "",
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RecoverFormData>({
        defaultValues,
    });

    const onSubmit = (data: RecoverFormData) => {
        console.log(data);
    };

    return (
        <div className="auth-section">
            <p className="upper biggest black">Відновлення паролю</p>
            <div className="password-modal">
                <div className="auth-modal-inputs-wrapper">
                    <div className="auth-modal-inputs">
                        <Input
                            type="email"
                            control={control}
                            errors={errors}
                            placeholder="email"
                            name="email"
                        />
                    </div>

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                        onClickCallback={handleSubmit(onSubmit)}
                    >
                        скинути пароль
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PasswordRecoverySection;
