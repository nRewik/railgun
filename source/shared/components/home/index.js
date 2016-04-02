import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './home.css'

const Agent = ({ name, rank, editing, onDecreaseRank, onIncreaseRank, onDelete, onEditing, onSetName }) => {
  const turnOnEditing = () => { onEditing(true) }
  const turnOffEditing = () => { onEditing(false) }
  const submitName = () => { name.length > 0 ? turnOffEditing() : onDelete() }
  const handleTextChange = e => { onSetName(e.target.value) }
  const handleKeyPress = e => { if (e.key === 'Enter') { submitName() } }

  const nameComponent = editing
    ? <input type='text' value={name} onKeyPress={handleKeyPress} onChange={handleTextChange}
      onBlur={submitName}
      ref={function (input) { if (input) input.focus() }}
      />
    : <span onDoubleClick={turnOnEditing} >{name}</span>

  return (
    <li>
      <button className={style.increment} onClick={onDecreaseRank}>-</button>
      <button className={style.increment} onClick={onIncreaseRank}>+</button>
      {' '}{nameComponent}—rank {rank}
    </li>
  )
}

Agent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
  onEditing: PropTypes.func.isRequired,
  onSetName: PropTypes.func.isRequired,
  onDecreaseRank: PropTypes.func.isRequired,
  onIncreaseRank: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

const Home = ({ agents, onDecreaseRank, onIncreaseRank, onAddAgent, onDeleteAgent, onEditAgent, onSetAgentName }) => {
  const renderAgent = agent => {
    const boundOnDecreaseRank = () => { onDecreaseRank(agent.id) }
    const boundOnIncreaseRank = () => { onIncreaseRank(agent.id) }
    const boundOnDeleteAgent = () => { onDeleteAgent(agent.id) }
    const boundOnEditAgent = editing => { onEditAgent(agent.id, editing) }
    const boundOnSetAgentName = name => { onSetAgentName(agent.id, name) }
    return (
      <Agent {...agent} key={agent.id}
        onDecreaseRank={boundOnDecreaseRank}
        onIncreaseRank={boundOnIncreaseRank}
        onDelete={boundOnDeleteAgent}
        onEditing={boundOnEditAgent}
        onSetName={boundOnSetAgentName}
      />
    )
  }
  return (
    <div>
      <div>Railgun Agents</div>
      <ul>{agents.map(agent => { return renderAgent(agent) })}</ul>
      <button onClick={onAddAgent}>Add Agent</button>
      <br/><br/>
      <div>* double click at agent name to edit</div>
      <div>* type blank name to delete</div>
    </div>
  )
}

Home.propTypes = {
  agents: PropTypes.array.isRequired,
  onDecreaseRank: PropTypes.func.isRequired,
  onIncreaseRank: PropTypes.func.isRequired,
  onAddAgent: PropTypes.func.isRequired,
  onDeleteAgent: PropTypes.func.isRequired,
  onEditAgent: PropTypes.func.isRequired,
  onSetAgentName: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const agents = []
  Object.keys(state.agents).forEach(id => {
    agents.push({ id: id, ...state.agents[id] })
  })
  return { agents: agents }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncreaseRank: id => { dispatch({ type: 'INCREASE_RANK', id: id }) },
    onDecreaseRank: id => { dispatch({ type: 'DECREASE_RANK', id: id }) },
    onAddAgent: () => { dispatch({ type: 'ADD_AGENT' }) },
    onDeleteAgent: id => { dispatch({ type: 'DELETE_AGENT', id: id }) },
    onEditAgent: (id, editing) => { dispatch({ type: 'SET_EDIT', id: id, editing: editing }) },
    onSetAgentName: (id, name) => { dispatch({ type: 'SET_NAME', id: id, name: name }) }
  }
}

// Connect props to component
export default connect(mapStateToProps, mapDispatchToProps)(Home)
