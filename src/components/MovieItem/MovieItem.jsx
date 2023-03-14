import React, { useState, useEffect } from "react";
import "./MovieItem.css";
import { format } from "date-fns";
import truncate from "../../utils/truncate";
import { Consumer } from "../../context/genreContext";
import { Progress, Rate, Image } from "antd";
import changeColor from "../../utils/changeColor";
import movieService from "../../services/services";

function MovieItem({ img, title, overview, date, genreId, vote, idForRate, onRate }) {
    const Images = "https://image.tmdb.org/t/p/w500";
    const NoImg = "../img/no4.svg";

    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(movieService.getLocalRating(idForRate));
    }, [idForRate]);

    return (
        <Consumer>
            {(genres) => (
                <li className="wrapper">
                    <section className="visual">
                        <Image src={img ? `${Images}${img}` : `${NoImg}`} height="281px" width="180px" />
                    </section>
                    <section className="content">
                        <Progress
                            type="circle"
                            percent={vote * 10}
                            format={(percent) => (percent / 10).toFixed(1)}
                            strokeColor={changeColor(vote)}
                            className="movie-info__rate"
                        />
                        <div className="box">
                            <h1 className="box__title">{title}</h1>
                            <p className="box__date">
                                {date ? format(new Date(date), "MMM dd, yyyy") : "No data"}
                            </p>
                            {genres.map((el) => {
                                if (genreId.includes(el.id)) {
                                    return (
                                        <p className="box__genre" key={el.id}>
                                            {el.name}
                                        </p>
                                    );
                                }
                                return null;
                            })}
                            <p className="box__text">{truncate(overview)}</p>
                        </div>
                        <div className="box__star">
                            <Rate
                                allowHalf
                                count="10"
                                value={rating}
                                onChange={(star) => {
                                    onRate(idForRate, star);
                                    setRating(star);
                                }}
                            />
                        </div>
                    </section>
                </li>
            )}
        </Consumer>
    );
}

export default MovieItem;