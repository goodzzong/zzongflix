import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'join' });
};
export const postJoin = (req, res) => {
  const {
    name, email, password, password_check,
  } = req.body;
  if (password !== password_check) {
    res.status(400);
    res.render('join', { pageTitle: 'Join' });
  } else {
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'login' });
};

export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.redirect(routes.home);
};
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'userDetail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'editProfile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'changePassword' });
