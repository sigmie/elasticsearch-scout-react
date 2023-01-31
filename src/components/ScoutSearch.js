import { useState, useEffect } from 'react'

function ScoutSearch(props) {

  const [response, setReponse] = useState({})
  const [loading, setLoading] = useState(false)

  let search = function () {

    setLoading(true);

    const body = {
      query: props.query,
      per_page: props.perPage,
      filter: props.filter,
      models: props.models
    }

    fetch(props.url,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(body)
      }).then((respone) => {
        return respone.json();
      })
      .then((response) => {
        setReponse(response);
        setLoading(false);
      });

  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      search()
    }, props.debounceMs)

    return () => clearTimeout(searchTimeout)
  }, [props.query, props.debounceMs]);

  return (<div>
    {props.children({ response, loading })}
  </div>)
}

ScoutSearch.defaultProps = {
  models: '',
  debounceMs: 150,
  query: '',
  filter: '',
  perPage: 10,
  url: '/elasticsearch-scout/search',
}

export default ScoutSearch;
