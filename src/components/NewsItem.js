import React from "react";

const NewsItem = (props) => {
    let { title, description, newsUrl, imageUrl, author, date, source} = props;
    return (
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://images.news18.com/ibnlive/uploads/2022/11/untitled-design-33-3-166807859516x9.png"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '50%', zIndex: '1'}}>
            {source}
            </span></h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-primary"
          >
            Read
          </a>
        </div>
      </div>
    );
}

export default NewsItem;
