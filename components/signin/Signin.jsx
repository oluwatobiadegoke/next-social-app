const Signin = () => {
  return (
    <section className="w-full flex justify-center mt-14">
      <div className="w-3/4 flex flex-col">
        <h1 className="authLetter">Sign in</h1>
        <form className="mt-14 justify-center">
          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="email" className="authLabel">
                Email *
              </label>
            </div>
            <input
              id="email"
              autoComplete="false"
              tabIndex="0"
              type="email"
              className="authInput"
            />
          </div>

          <div className="authContainer">
            <div className="authLabelContainer">
              <label htmlFor="password" className="authLabel">
                Password *
              </label>
            </div>
            <input
              id="password"
              autoComplete="false"
              tabIndex="0"
              type="password"
              className="authInput"
            />
          </div>
          <div className="w-full flex justify-center">
            <button className="authButton">Sign In</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
