const TextfieldArea = (props: any) => {
  const {
    setFields,
    user,
    title,
    setTitle,
    about,
    setAbout,
    destination,
    setDestination,
    categories,
    setCategory,
    uploadPin,
  } = props;

  return (
    <div className='mt-5 flex w-full flex-1 flex-col gap-6 overflow-auto lg:pl-5'>
      <input
        type='text'
        value={title}
        onChange={(e) => {
          setFields(false);
          setTitle(e.target.value);
        }}
        placeholder='Add your title here'
        className='border-b-2 border-gray-200 p-2 text-2xl font-bold outline-none sm:text-3xl'
      />
      {user && (
        <div className='my-2 flex items-center gap-2 rounded-lg bg-white'>
          <img
            src={user.image}
            alt='User profile'
            className='h-10 w-10 rounded-full'
          />
          <p className='font-bold'>{user.userName}</p>
        </div>
      )}
      <input
        type='text'
        value={about}
        onChange={(e) => {
          setFields(false);
          setAbout(e.target.value);
        }}
        placeholder='What is your pin about?'
        className='border-b-2 border-gray-200 p-2 text-base font-bold outline-none sm:text-lg'
      />
      <input
        type='text'
        value={destination}
        onChange={(e) => {
          setFields(false);
          setDestination(e.target.value);
        }}
        placeholder='Add a destination link!'
        className='border-b-2 border-gray-200 p-2 text-base font-bold outline-none sm:text-lg'
      />
      <div className='flex flex-col'>
        <div>
          <p className='mb-2 text-lg font-semibold sm:text-xl'>
            Choose pin category
          </p>
          <select
            onChange={(e) => {
              setFields(false);
              setCategory(e.target.value);
            }}
            className='w-4/5 cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base capitalize outline-none'
          >
            <option value='other' className='bg-white'>
              Select Category
            </option>
            {categories.map((category: any) => (
              <option
                key={category.name}
                value={category.name}
                className='border-0 bg-white text-base text-black outline-none'
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-5 flex items-end justify-end'>
          <button
            type='button'
            className='w-28 rounded-full bg-red-500 p-2 font-bold text-white outline-none'
            onClick={uploadPin}
          >
            Create Pin!
          </button>
        </div>
      </div>
    </div>
  );
};

export { TextfieldArea };
