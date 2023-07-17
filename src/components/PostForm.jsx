import React, {useState} from 'react';
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/Button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title:'', body:''})

    const addNewPost =(e) => {
        e.preventDefault()
        const newPost= {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title:'', body:''})

    }


    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={post.title}
                onChange={e=> setPost({...post, title: e.target.value})}
                type="text"
                placeholder="название поста"
            />

            {/*НеУправляемый компонент*/}
            <MyInput
                value={post.body}
                onChange={e=> setPost({...post, body: e.target.value})}
                type="text"
                placeholder="описание поста"
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;