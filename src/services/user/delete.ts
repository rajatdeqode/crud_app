import User from '../../../models/user_model'

const delete_user=async(id:any)=>{
    const deleted_user=User.findByIdAndDelete(id);
    return deleted_user
}

export default delete_user