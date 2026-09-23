import { Brand } from './brand'

export function Footer() {
  return (
    <footer className="fb-footer">
      <div className="fb-footer-in">
        <Brand href="/" />
        <p>
          A day of games, building, problem solving and teamwork for young builders ages 7–17.
        </p>
        <a className="fb-footer-mail" href="mailto:academyfuturebuilders@gmail.com">
          academyfuturebuilders@gmail.com
        </a>
      </div>
      <div className="fb-footer-bottom">© {new Date().getFullYear()} Future Builders Academy</div>
    </footer>
  )
}