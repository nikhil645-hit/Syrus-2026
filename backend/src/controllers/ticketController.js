/**
 * @module controllers/ticketController
 * @description Handles starter ticket retrieval and status updates.
 */

const localStore = require('../data/localStore');

async function getStarterTickets(req, res) {
  try {
    const tickets = localStore.listTicketsForUser(req.user);

    res.json({
      success: true,
      data: { tickets },
      error: null,
    });
  } catch (err) {
    console.error('[TicketController] Get tickets error:', err.message);
    res.status(500).json({
      success: false,
      data: null,
      error: 'Failed to retrieve starter tickets.',
    });
  }
}

async function updateTicketStatus(req, res) {
  try {
    const { status } = req.body;
    const validStatuses = ['assigned', 'in_progress', 'completed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        data: null,
        error: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = localStore.updateTicketStatus(req.user.id, req.params.id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        data: null,
        error: 'Ticket not found or not available for this user.',
      });
    }

    localStore.logProgress(req.user.id, 'ticket_status_changed', {
      ticket_id: req.params.id,
      new_status: status,
    });

    res.json({
      success: true,
      data: updated,
      error: null,
    });
  } catch (err) {
    console.error('[TicketController] Update ticket error:', err.message);
    res.status(500).json({
      success: false,
      data: null,
      error: 'Failed to update ticket status.',
    });
  }
}

module.exports = { getStarterTickets, updateTicketStatus };
