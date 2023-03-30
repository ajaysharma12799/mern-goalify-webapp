import React from 'react'
import ReactModal from 'react-modal';
import { RxCross1 } from 'react-icons/rx';
import { useFormik } from 'formik';

ReactModal.setAppElement('#react-modal-portal');

const EditGoalModal = ({ isEditGoalModalOpen, toggleEditGoalModal }) => {
    const formik = useFormik({
        initialValues: {
            text: ''
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const handleDiscard = () => {
        const confirmationResult = window.confirm('Are You Sure??');
        if (confirmationResult) {
            toggleEditGoalModal();
            return true;
        }
        else {
            return false;
        }
    }
    return (
        <React.Fragment>
            <ReactModal
                isOpen={isEditGoalModalOpen}
                onRequestClose={toggleEditGoalModal}
            >
                <div className='w-fit ml-auto'>
                    <button onClick={toggleEditGoalModal} className='border rounded-md p-3'>
                        <RxCross1 />
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='my-3 flex flex-col items-start'>
                        <label htmlFor="goal-title" className='font-bold'>Goal Title</label>
                        <input
                            type="text"
                            value={formik.values.text}
                            name='text'
                            onChange={formik.handleChange}
                            className='border rounded-md py-3 px-2 w-full my-2'
                        />
                    </div>
                    <div className='my-3 flex flex-col items-start'>
                        <label
                            htmlFor="goal-priority"
                            className='font-bold'
                        >
                            Goal Priority
                        </label>
                        <select
                            name="priority"
                            id="goal-priority"
                            className='border rounded-md py-3 px-2 w-full my-2'
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className='flex items-center justify-between gap-5'>
                        <button
                            onClick={handleDiscard}
                            className="my-3 bg-red-500 w-1/2 rounded-md text-white text-center py-3"
                        >
                            Discard
                        </button>
                        <button
                            type='submit'
                            className="my-3 bg-gray-500 w-1/2 rounded-md text-white text-center py-3"
                        >
                            Edit Goal
                        </button>
                    </div>
                </form>
            </ReactModal>
        </React.Fragment>
    )
}

export default EditGoalModal