import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../contexts';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import moment from 'moment';
import { Button, CircularProgress } from '@mui/material';
import settingsApi from '../../api/settings';
import { toast } from 'react-toastify';

const SurgeDates = () => {

    // states
    const [surgeDates, setSurgeDates] = useState([]);
    const [loading, setLoading] = useState(false);

    // context
    const { admin } = useContext(AdminContext);

    // add surge dates
    const updateSurgeDates = async () => {

        // remove duplicate item
        const newSurgeDatesArr = [];
        surgeDates.forEach(date => {
            if (newSurgeDatesArr.indexOf(date) < 0) {
                newSurgeDatesArr.push(date);
            }
        });

        setLoading(true);
        try {
            await settingsApi.updateSurgeDates(admin._id, { surgeDates: newSurgeDatesArr });
            if (admin?.surgeDates.length > 0) {
                toast.success('Surge dates updated');
            } else {
                toast.success('Surge dates added');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (admin?.surgeDates) {
            setSurgeDates(admin.surgeDates);
        }
    }, [admin]);

    return (
        <>
            <h2 className='font-semibold text-xl pb-2 px-3 border-b'>Surge Dates</h2>
            <div className='flex flex-col justify-center gap-4 mt-5'>
                <ul className='flex flex-wrap gap-3'>
                    {surgeDates.map((item, index) => <li key={index} className='text-sm px-6 py-2 rounded-md bg-white shadow-md border'>{moment(item).format('ll')}</li>)}
                </ul>
                <div className='flex gap-5'>
                    <DatePicker
                        multiple={true}
                        plugins={[
                            <DatePanel key={1} />
                        ]}
                        format="MM-DD-YYYY"
                        placeholder="Select Dates"
                        value={surgeDates}
                        containerClassName="!w-72"
                        inputClass="!w-full focus:!outline-none border border-[#000000] rounded-md py-2 px-3 text-sm"
                        onChange={(_, v) => {
                            const val = v.validatedValue.filter(i => typeof i === 'string');
                            setSurgeDates(val);
                        }}
                    />
                    <Button
                        variant='contained'
                        onClick={updateSurgeDates}
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={18} color='inherit' />}
                    >
                        {admin?.surgeDates.length > 0 ? 'Update Surge Dates' : 'Add Surge Dates'}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SurgeDates;
