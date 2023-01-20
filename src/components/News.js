import React, {useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropTypes } from 'prop-types';

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(true)
    const [totalResults, settotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

  const updateData = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateData();
    document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`;
  }, [])
  

  const handleNext = async () => {
    setpage(page+1)
    updateData();
  };

  const handlePrev = async () => {
    setpage(page-1)
    updateData();
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)

  }

    return (
        <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: '100px' }}>
          Top-{capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
            <div className="container">
        <div className="row">
          {
            articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    newsUrl={element.url}
                    imageUrl={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
    
        </>
    );
}

// News.defaultProps = {
//     pageSize: 10,
//     category: 'general'
// }

// News.PropTypes = {
//     pageSize: PropTypes.number,
//     category:PropTypes.string
// }

export default News;
