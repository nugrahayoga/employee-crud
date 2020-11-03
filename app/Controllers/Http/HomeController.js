'use strict'

class HomeController {

  index({ view, auth }) {
    const user = auth.user.toJSON()
    return view.render('home', { user: user })
  }

}

module.exports = HomeController