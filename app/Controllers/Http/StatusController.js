'use strict'

const Status = use('App/Models/Status')

class StatusController {

async index({ request, response, view }) {
const statuses = await Status.all()
    return view.render('statuses.index', { statuses: statuses.rows })
}

create({ request, response, view }) {
    return view.render('statuses.create')
}

async store({ request, response, view, session }) {
const status = new Status()

status.status = request.input('status')
    await status.save()

session.flash({ notification: 'Status Berhasil Disimpan!' })
    return response.route('statuses.index')

}

async edit({ request, response, view, params }) {
    const id = params.id
    const status = await Status.find(id)
  
    return view.render('statuses.edit', { status: status })
  }
  
async update({ request, response, view, params, session }) {
const id = params.id
const status = await Status.find(id)

status.status = request.input('status')
    await status.save()

session.flash({ notification: 'Status Berhasil Diupdate!' })
    return response.route('statuses.index')
}

async delete({ request, response, view, params, session}) {
const id = params.id
const status = await Status.find(id)
    await status.delete()

session.flash({ notification: 'Status Berhasil Dihapus!' })
    return response.route('statuses.index')
}

}

module.exports = StatusController