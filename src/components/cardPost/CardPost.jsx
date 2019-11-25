import React from 'react';

const CardPost = (props) => {
    return(
        <>
        <div className="post">
                <div className="img-thumb">
                    <img src={props.img} alt="my-dummy-display-file"/>
                </div>
                <div className="content">
                    <p className="title"> {props.data.title} </p>
                    <p className="desc">{props.data.body}</p>
                    <button className="update" onClick={ ()=> props.update(props.data)}>update</button>
                    <button className="remove" onClick={ ()=> props.remove(props.data.id)}>remove</button>
                </div>
            </div>
        </>
    );
}
CardPost.defaultProps = {
    img: 'https://placeimg.com/200/150/tech'
}
export default CardPost;