import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import PropTypes from 'prop-types';

export const NumberInputField = ({ Form, name, errorMsg, label, icon }) => {

    // react-hook-form
    const { register, formState: { errors } } = Form;

    return <div>
        <FormControl fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
                label={label}
                type="number"
                className="!text-sm"
                InputLabelProps={{ className: '!text-sm' }}
                {...register(name, { required: errorMsg })}
            />
        </FormControl>
        {errors[name] && <span className="text-xs font-medium text-red-500">{errors[name]?.message}</span>}
    </div>
}

export const TextInputField = ({ Form, name, errorMsg, label, icon }) => {

    // react-hook-form
    const { register, formState: { errors } } = Form;

    return <div>
        <FormControl fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
                label={label}
                type="text"
                className="!text-sm"
                InputLabelProps={{ className: '!text-sm' }}
                {...register(name, { required: errorMsg })}
            />
        </FormControl>
        {errors[name] && <span className="text-xs font-medium text-red-500">{errors[name]?.message}</span>}
    </div>
}

// Props Validation
NumberInputField.propTypes = {
    Form: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}

// Props Validation
TextInputField.propTypes = {
    Form: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}