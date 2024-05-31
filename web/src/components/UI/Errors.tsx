type ErrorsProps = {
    errors: any;
};

const Errors = ({ errors }: ErrorsProps) => {
    return (
        <div className="auth-errors">
            {errors &&
                Object.keys(errors).map((key: string) => (
                    <p key={key}>{(errors as any)[key].message}</p>
                ))}
        </div>
    );
};

export default Errors;
