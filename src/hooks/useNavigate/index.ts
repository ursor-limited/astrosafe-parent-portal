const useNavigate = () => {
  const push = (path: string) => {
    const newUrl =
      window.location.origin + path.startsWith('/') ? path.substring(1) : path

    window.location.href = newUrl
  }

  return { push }
}

export default useNavigate
