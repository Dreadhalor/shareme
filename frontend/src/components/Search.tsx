import { useEffect, useState } from 'react';
import { MasonryLayout, Spinner } from 'components';
import { client } from 'utils/client';
import { feedQuery, searchQuery } from 'utils/data';

const Search = ({ searchTerm, setSearchTerm }: any) => {
  const [pins, setPins] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {/* {searchTerm} */}
      {loading ? (
        <Spinner message='Searching for pins...' />
      ) : (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Search;
