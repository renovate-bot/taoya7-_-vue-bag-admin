'use strict'

const baseController = require('./baseController')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { nanoid } = require('nanoid')

class MenuController extends baseController {

    /**
     * 添加数据
     * @returns {Promise<void>}
     */
    async create() {
        const { ctx } = this
        const { body } = ctx.request
        const userinfo = await ctx.service.user.getUserinfo()
        body.user_id = userinfo.id
        body.meun_id = nanoid()
        const result = await ctx.model.Menu.create({ ...body })
        this.result({ data: result })
    }

    /**
     * 删除数据
     * @returns {Promise<void>}
     */
    async delete() {
        const { ctx } = this
        const { id } = ctx.request.body
        const result = await ctx.model.Menu.destroy({
            where: { id },
        })
        this.result({ data: result })
    }

    /**
     * 删除多个路由
     * @returns {Promise<void>}
     */
    async deletes() {
        const { ctx } = this
        const { ids } = ctx.request.body
        const result = await ctx.model.Menu.destroy({
            where: {
                id: [...ids],
            },
        })
        this.result({ data: result })
    }


    /**
     * 查找
     * @returns {Promise<void>}
     */
    async find() {
        const { ctx } = this
        const { id } = ctx.request.body
        const result = await ctx.model.Menu.findOne({
            where: { id },
        })
        this.result({ data: result })
    }

    /**
     * 获取所有数据，可以带条件查询
     * @returns {Promise<void>}
     */
    async all() {
        const { ctx } = this
        const { ks } = ctx.request.body
        const where = {}
        if (ks) {
            where.name = { [Op.like]: `%${ks}%` } // 模糊查詢 https://www.sequelize.com.cn/core-concepts/model-querying-basics
        }
        const userinfo = await ctx.service.user.getUserinfo()
        const result = await ctx.model.Menu.findAll({
            where: { ...where, user_id: userinfo.id },
        })
        this.result({ data: result })
    }

    /**
     * 编辑数据
     * @returns {Promise<void>}
     */
    async update() {
        const { ctx } = this
        const body = ctx.request.body
        const result = await ctx.model.Menu.update({
            ...body,
        }, {
            where: {
                id: body.id,
            },
        })
        this.result({ data: result })
    }
}

module.exports = MenuController
