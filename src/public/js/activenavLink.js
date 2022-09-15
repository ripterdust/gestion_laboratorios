const activeClass = 'activo'
const { pathname, origin } = window.location

const navLink = document.querySelectorAll('.options a')

navLink.forEach((a) => {
    const link = a.href.replace(origin, '')
    if (link === pathname) a.classList.add(activeClass)
})
