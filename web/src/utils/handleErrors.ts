export const handleErrors = (errors: any) => {
    const outputError: any = {};
    if (Array.isArray(errors?.detail)) {
        for (const error of errors.detail) {
            outputError[error.loc[1]] = error.msg;
        }
    } else {
        outputError.error =
            errors?.detail || "Щось пішло не так. Спробуйте пізніше ;(";
    }

    console.log(outputError);

    return outputError;
};
