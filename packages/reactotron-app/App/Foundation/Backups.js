import React from 'react'
import Colors from '../Theme/Colors'
import AppStyles from '../Theme/AppStyles'
import { inject, observer } from 'mobx-react'
import BackupsHeader from './BackupsHeader'
import moment from 'moment'
import IconDelete from 'react-icons/lib/md/delete'
import IconRename from 'react-icons/lib/md/create'
import Empty from '../Foundation/EmptyState'

const Styles = {
  container: {
    ...AppStyles.Layout.vbox,
    margin: 0,
    flex: 1
  },
  backups: {
    margin: 0,
    padding: 0,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  row: {
    ...AppStyles.Layout.hbox,
    padding: '15px 20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${Colors.line}`,
    cursor: 'pointer'
  },
  name: {
    color: Colors.tag,
    textAlign: 'left',
    flex: 1
  },
  iconSize: 24,
  upload: {
    paddingRight: 10,
    cursor: 'pointer'
  },
  button: {
    cursor: 'pointer',
    paddingLeft: 10
  }
}

const Backups = inject('session')(observer(props => {
    const renderEmpty = () => {
      return (
        <Empty icon='import-export' title='No Snapshots'>
          <p>
            To take a snapshot of your current Redux store, press the Download button in the top right
            corner of this window.
          </p>
        </Empty>
      )
    }

    const renderBackup = (backup, indent = 0) => {
      const { ui } = props.session
      const { restoreState } = ui
      const { state } = backup.payload
      const restore = restoreState.bind(this, state)
      const { messageId, date } = backup
      const key = `backup-${messageId}`
      const name = backup.payload.name || moment(date).format('dddd @ h:mm:ss a')
      const deleteState = event => {
        ui.deleteState(backup)
        event.stopPropagation()
      }
      const renameState = event => {
        ui.openRenameStateDialog(backup)
        event.stopPropagation()
      }

      return (
        <div style={Styles.row} key={key} onClick={restore}>
          <div style={Styles.name}>{name}</div>
          <IconRename
            size={Styles.iconSize}
            style={Styles.button}
            onClick={renameState}
          />
          <IconDelete
            size={Styles.iconSize}
            style={Styles.button}
            onClick={deleteState}
          />
        </div>
      )
    }

    const backups = props.session.backups.slice()
    const isEmpty = backups.length === 0

    return (
      <div style={Styles.container}>
        <BackupsHeader />
        {isEmpty
          ? renderEmpty()
          : <div style={Styles.backups}>
            {backups.map(renderBackup)}
          </div>}
      </div>
    )
}))

export default Backups
