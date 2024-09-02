const useNavigate = () => {
  const push = (path: string) => {
    const newUrl = window.location.href + path;

    window.location.href = newUrl.replace('//', '/');
  };

  return { push };
};

export default useNavigate;
