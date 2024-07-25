import { Add, Close } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import settingsApi from "../../api/settings";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'

const TermsAndCondition = ({ tripName, name, conditions, adminId }) => {

    // states
    const [value, setValue] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState([]);
    const [loading, setLoading] = useState(false);

    const remove = (index) => {
        const newConditionsArr = [...termsAndConditions];
        newConditionsArr.splice(index, 1);
        setTermsAndConditions(newConditionsArr);
    }

    // update conditions handler
    const updateConditions = async () => {

        setLoading(true);
        try {
            await settingsApi.updateConditions(adminId, { [name]: termsAndConditions });
            if (conditions.length > 0) {
                toast.success('Terms and Conditions Updated.');
            } else {
                toast.success('Terms and Conditions Added.');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setTermsAndConditions(conditions);
    }, [conditions]);

    return (
        <div>
            <span className="mb-2 font-semibold text-sm block">{tripName}</span>
            {termsAndConditions.length > 0 && <ul className='flex flex-col space-y-1 mb-5'>
                {termsAndConditions.map((item, index) => <li key={index} className="bg-white text-sm shadow-lg px-3 py-2 rounded-lg border flex justify-between gap-3 items-center">
                    <span>{item}</span>
                    <IconButton onClick={() => remove(index)} size="small">
                        <Close />
                    </IconButton>
                </li>)}

            </ul>}

            <div className="flex items-center gap-3">
                <TextField
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    label='Add New Terms and Condition'
                    InputLabelProps={{ className: '!text-sm' }}
                />
                <Button
                    onClick={() => {
                        setTermsAndConditions([...termsAndConditions, value]);
                        setValue('');
                    }}
                    disabled={Boolean(!value)}
                    variant="contained"
                    startIcon={<Add />}
                >Add</Button>
            </div>

            <Button
                disabled={loading}
                onClick={updateConditions}
                variant="contained"
                className='!mt-3'
                startIcon={loading && <CircularProgress size={16} color="inherit" />}
            >
                {conditions.length > 0 ? 'Update Conditions' : 'Add Conditions'}
            </Button>
        </div>
    );
}

TermsAndCondition.propTypes = {
    tripName: PropTypes.string,
    name: PropTypes.string,
    conditions: PropTypes.array,
    adminId: PropTypes.string,
}

export default TermsAndCondition;
