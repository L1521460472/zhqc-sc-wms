export default {
  created() {
  },
  methods: {
    /* 新增同级 */
    handleClick() {
      console.log('handleClick')
    },

    /* 新增子级 */
    addChild() {
      console.log('addChild')
    },

    /* 保存 */
    save() {
      this.topForm.ref.validate(valid => {
        if (valid) {
          console.log('save')
        }
      })
    },

    /* 删除 */
    delete() {
      console.log('delete')
    }
  }
}
