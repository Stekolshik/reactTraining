import React, {useEffect, useRef, useState} from "react";
import PostService from "../API/PostService";
import {useFetching} from "../Hooks/UseFetching";
import {usePosts} from "../Hooks/usePosts";
import {getPageCount} from "../utiles/pages";
import MyButton from "../components/UI/Button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import Counter from "../components/Counter";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import {useObserver} from "../Hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'javascript', body: 'Description'},
        {id: 2, title: 'javascript', body: 'Description'},
        {id: 3, title: 'javascript', body: 'Description'},
    ])
    const [filter, setFilter] = useState({sort:'' , query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setTLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef()



    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount  = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, ()=>{
        setPage(page + 1);
    })

    useEffect(()=>{
        fetchPosts(limit, page)
    }, [page, limit])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)

    }



    // ПОлучаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) =>{
        setPage(page)

    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>GET POSTS</button>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)} >
                Создать ПОСТ
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <count> <Counter/></count>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setTLimit(value)}
                defaultValue="кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 15, name: '15'},
                    {value: -1, name: 'все'},
                ]}
            />
            {postError &&
                <h1>ПРОИЗОШЛА ОШИБКА!!!${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"/>
            <div ref={lastElement} style={{height: 20 , background: 'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent:'center', marginTop: 100}}><Loader/></div>


            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
