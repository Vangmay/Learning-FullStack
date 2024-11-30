const Filter = ({ searchKeyWord, setSearchKeyWord }) => {
  return (
    <>
      Filter words with:
      <input
        onChange={(e) => setSearchKeyWord(e.target.value)}
        value={searchKeyWord}
      />
    </>
  );
};

export default Filter;
