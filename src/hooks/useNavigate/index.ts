const useNavigate = () => {
  const push = (path: string) => {
    const newUrl = window.location.origin + path

    window.location.href = newUrl
  }

  return { push }
}

export default useNavigate
