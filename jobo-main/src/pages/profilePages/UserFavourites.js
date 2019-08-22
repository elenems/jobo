import React, { useContext, useState, useEffect } from "react";
import Loader from "../../components/Loader";
import LoaderDark from "../../components/LoaderDark";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import JobItem from "../../components/JobItem";

export default function UserFavourites(props) {
  const user = useContext(UserContext);

  const [isLoading, setIsloading] = useState(true);
  const [favourites, setFavourites] = useState([]);

  const style = props.style;

  useEffect(() => {
    if (user.user.email) {
      setIsloading(true);
      axios
        .get(`/getUser?email=${user.user.email}`)
        .then(data => {
          return data;
        })
        .then(data => {
          axios
            .post("/getStarredJobs", {
              jobs: data.data.staredJobs
            })
            .then(stars => {
              setFavourites(stars.data.staredJobs);
              setIsloading(false);
            })
            .catch(e => {
              setIsloading(false);
            });
        })
        .catch(e => {
          setIsloading(false);
        });
    }
  }, [user.user.email]);

  const unstarJob = (jobId, userId) => () => {
    axios
      .post("/removeStarJob", {
        userId,
        jobId
      })
      .then(data => {
        let arr = [];
        for (let x of favourites) {
          if (data.data.staredJobs.indexOf(x.id) !== -1) {
            arr.push(x);
          }
        }
        setFavourites(arr);
      })
      .catch(e => {
        setIsloading(false);
      });
  };

  const loader =
    style.text === "#000" ? (
      <Loader height="unset" />
    ) : (
      <LoaderDark height="unset" />
    );

  let content = isLoading ? (
    loader
  ) : (
    <div>
      {!favourites.length ? (
        <p>You have no favourite jobs</p>
      ) : (
        <ul>
          {favourites.map(item => {
            return (
              <JobItem
                unstar={unstarJob(item.id, user.user.email)}
                key={item.id}
                fromCompany={false}
                job={item}
                styleContext={style}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
  return (
    <section style={{ color: style.text, background: style.background }}>
      <h2>Favourites</h2>
      {content}
    </section>
  );
}
