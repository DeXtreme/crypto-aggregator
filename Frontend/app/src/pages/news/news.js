import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { API_HOST } from '../../config';
import { addArticles } from '../../store/actions';
import Article from '../../components/article/article';
import './news.css';

function News(){
    let articles = useSelector(state => state.articles);
    let dispatch = useDispatch();
    let [isLoadNext , setLoadNext] = useState(false);
    let [isLoadPrev , setLoadPrev ] = useState(false);
    let [canLoadPrev, setCanLoadPrev] = useState(true);
    useEffect(() => {
        if(articles.length==0){
            loadNextArticles();
        }
    }, []);

    const loadNextArticles = (id) => {
        setLoadNext(true);
        let url = `${API_HOST}v1/articles/`;
        if(id){
            url += `?next=${id}`
        }
        fetch(url).then( response => {
            if(response.ok){
                response.json().then(json =>{
                    let articles = json.results;
                    dispatch(addArticles(articles));
                })
            }else{
                console.log(response.json());
            }
        }).catch(error =>{
            console.log(error.message);
        }).finally(() => setLoadNext(false))
    }

    const loadPrevArticles = (id) => {
        setLoadPrev(true);
        let url = `${API_HOST}v1/articles/?prev=${id}`;
        fetch(url).then( response => {
            if(response.ok){
                response.json().then(json =>{
                    let articles = json.results;
                    dispatch(addArticles(articles, true));
                    if(json.count<15){
                        setCanLoadPrev(false);
                    }
                })
            }else{
                console.log(response.json());
            }
        }).catch(error =>{
            console.log(error.message);
        }).finally(() => setLoadPrev(false))
    }

    const scroll = (e) =>{
        if(canLoadPrev){
            let distance = (e.target.scrollHeight - e.target.scrollTop)/window.innerHeight;
            if(distance<3 && !isLoadPrev){
                loadPrevArticles(articles[articles.length-1].id);
            }
        }
    }

    return (
        <div className="news" onScroll={scroll}>
            {isLoadNext &&
            <div> 
                <div className="loadingio-spinner-eclipse-6jnodqcrdsw"><div className="ldio-4xn00gmph3">
                    <div></div>
                </div></div>
            </div>}
            {articles.map((article,i) => <Article article={article} key={i}/>)}
            {isLoadPrev && 
            <div> 
                <div className="loadingio-spinner-eclipse-6jnodqcrdsw"><div className="ldio-4xn00gmph3">
                    <div></div>
                </div></div>
            </div>}
        </div>
    );
}

export default News;