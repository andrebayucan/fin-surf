import { supabase } from '../Client'
import './DeleteBtn.css'

const DeleteBtn = ({id}) => {

    const deleteDatabasePost = async() => {
        await supabase
        .from("Posts")
        .delete()
        .eq("id", id)

        window.location = "/"
    }

    return (
        <button className="delete-btn small-padding" onClick={deleteDatabasePost}>
            <img src="/trash.svg" alt="A trash can icon." />
            Delete
        </button>
    )
}

export default DeleteBtn