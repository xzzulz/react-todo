
(function() {

  // individual task component
  // props
  //  checked boolean
  //  text string
  var TodoItem = React.createClass({
    getCheckboxSrc: function() {
      return this.props.item.checked ? 'img/done.png' : 'img/todo.png'
    },
    getColor: function() {
      return this.props.item.checked ? '#aaa' : '#000'
    },
    delTask: function() {
      this.props.delTask(this.props.index)
    },
    switchTask: function() {
      this.props.switchTask(this.props.index)
    },
    render: function() {
      return (
        <div className="item">
          <div className="itemIcon">
            <img className="todoCheck" src={this.getCheckboxSrc()}
              onClick={this.switchTask} />
          </div>
          <div className="itemText"><span style={{ color:this.getColor() }} >{this.props.item.text}</span></div>
          <div className="itemClose">
            <img className="todoClose" src="img/delete.png"
              onClick={this.delTask} />
          </div>
        </div>
      )
    }

  })


  // list of tasks component
  // props
  //   items
  var TodoTasks = React.createClass({
    doItems: function() {
      return this.props.items.map(function(item, i) {
        return <TodoItem item={item} delTask={this.props.delTask}
          switchTask={this.props.switchTask} key={'task' + i} index={i} />
      }, this)
    },
    render: function() {
      return (
        <div id="tasksList">{this.doItems()}</div>
      )
    }

  })


  // sample initial data for the todo list
  var sampleData = [
    { checked: false, text: "Go for a walk" },
    { checked: true, text: "Buy some drinks" },
    { checked: false, text: "Go to the gym" },
    { checked: false, text: "Take vitamins" },
  ]

  // main todo component
  var Todo = React.createClass({
    addTask: function() {
      var input = React.findDOMNode(this.refs.newTaskInput)
      if (input.value) {
        this.state.items.unshift({ checked: false, text: input.value })
        this.setState({ items: this.state.items })
        input.value = ''
      }
    },
    delTask: function(i) {
      this.state.items.splice(i, 1)
      this.setState({ items: this.state.items })
    },
    switchTask: function(i) {
      this.state.items[i].checked = this.state.items[i].checked ? false : true
      this.setState({ items: this.state.items })
    },
    getInitialState: function() {
      return { items: sampleData };
    },
    render: function() {
      return (
        <div >
          <div id="top"><h1>React Todo</h1></div>

          <div className="item">
            <input id="newItem" ref="newTaskInput"/>
            <img id="addIcon" src="img/add.png" onClick={this.addTask}/>
          </div>

          <TodoTasks items={this.state.items} delTask={this.delTask}
            switchTask={this.switchTask} />
        </div>
      )
    }

  })


  var boxNode = document.getElementById('box')
  React.render(<Todo />, boxNode);

})()
