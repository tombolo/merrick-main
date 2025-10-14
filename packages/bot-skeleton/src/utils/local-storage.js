import LZString from 'lz-string';
import localForage from 'localforage';
import DBotStore from '../scratch/dbot-store';
import { save_types } from '../constants/save-type';
import AutoRobot from './bots/BRAMEVENODDPRINTER.xml';
import OverUnderBot from './bots/Derivwizard.xml';
import Derivminer from './bots/ENHANCEDDigitSwitcherVERSION5.xml';
import Mrduke from './bots/masterG8OVERUNDERBYSTATEFXVERSION12026.xml';
import Recovery from './bots/OverDestroyerbystatefx.xml';
import Sv6 from './bots/STATESDigitSwitcherV2.xml';

// Ensure Blockly is available globally
const getBlockly = () => {
    if (typeof window !== 'undefined' && window.Blockly) {
        return window.Blockly;
    }
    throw new Error('Blockly not available - workspace not initialized');
};

// Static bot configurations
const STATIC_BOTS = {
    auto_robot: {
        id: 'auto_robot',
        name: 'version 4 AIbot 2025 by states fx',
        xml: AutoRobot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    over_under: {
        id: 'over_under_bot_by_GLE',
        name: 'Deriv wizard 1',
        xml: OverUnderBot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    deriv_miner_pro: {
        id: 'deriv_miner_pro',
        name: 'ENHANCED Digit Switcher VERSION 5',
        xml: Derivminer,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    mrduke: {
        id: 'mrduke',
        name: 'master G8 OVER UNDER BY STATE FX VERSION 1',
        xml: Mrduke,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    recovery: {
        id: 'recovery',
        name: 'Over Destroyer by state fx',
        xml: Recovery,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    sv6: {
        id: 'sv6',
        name: 'STATES Digit Switcher V2',
        xml: Sv6,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
};

const getStaticBots = () => Object.values(STATIC_BOTS);

/**
 * 🔒 Disable saving bots
 */
export const saveWorkspaceToRecent = async () => {
    console.warn('[INFO] Saving disabled → Using static bots only.');
    const {
        load_modal: { updateListStrategies },
    } = DBotStore.instance;
    updateListStrategies(getStaticBots());
};

/**
 * ✅ Always return static bots
 */
export const getSavedWorkspaces = async () => {
    const bots = getStaticBots();
    console.log(
        '[DEBUG] Available static bots:',
        bots.map(bot => bot.id)
    );
    return bots;
};

/**
 * Load a bot by ID (from static list only)
 */
export const loadStrategy = async strategy_id => {
    console.log(`[DEBUG] Attempting to load bot: ${strategy_id}`);

    // Check for duplicate IDs
    const staticBots = getStaticBots();
    const duplicateIds = staticBots.filter((bot, index) => staticBots.findIndex(b => b.id === bot.id) !== index);

    if (duplicateIds.length > 0) {
        console.error(
            '[ERROR] Duplicate bot IDs found:',
            duplicateIds.map(b => b.id)
        );
    }

    const strategy = staticBots.find(bot => bot.id === strategy_id);

    if (!strategy) {
        console.error(
            `[ERROR] Bot with id "${strategy_id}" not found. Available bots:`,
            staticBots.map(b => b.id)
        );
        return false;
    }

    try {
        // Get Blockly instance
        const Blockly = getBlockly();
        
        // Ensure workspace is initialized (allow early clicks from bot list)
        const waitForWorkspace = async (timeout_ms = 5000, interval_ms = 100) => {
            const start = Date.now();
            while (!Blockly.derivWorkspace && Date.now() - start < timeout_ms) {
                // eslint-disable-next-line no-await-in-loop
                await new Promise(resolve => setTimeout(resolve, interval_ms));
            }
            return !!Blockly.derivWorkspace;
        };

        const has_workspace = await waitForWorkspace();
        if (!has_workspace) {
            console.error('[ERROR] Blockly workspace not initialized');
            return false;
        }

        // Clear existing workspace first
        console.log('[DEBUG] Clearing existing workspace');
        Blockly.derivWorkspace.clear();

        // Parse XML using Blockly parser first, then fall back to DOMParser
        let xml_root;
        try {
            const blockly_doc = Blockly.utils?.xml?.textToDom?.(strategy.xml);
            xml_root = blockly_doc?.documentElement || blockly_doc;
        } catch (e) {
            console.log('[DEBUG] Blockly parser failed, trying DOMParser:', e.message);
            const parser = new DOMParser();
            const doc = parser.parseFromString(strategy.xml, 'application/xml');
            if (doc.getElementsByTagName('parsererror').length) {
                console.error('[ERROR] Invalid XML content for bot:', strategy_id);
                return false;
            }
            xml_root = doc.documentElement;
        }

        const convertedXml = convertStrategyToIsDbot(xml_root);

        Blockly.Xml.domToWorkspace(convertedXml, Blockly.derivWorkspace);
        Blockly.derivWorkspace.current_strategy_id = strategy_id;

        console.log(`[SUCCESS] Loaded static bot: ${strategy.name} (ID: ${strategy_id})`);
        return true;
    } catch (error) {
        console.error('Error loading static bot:', error);
        return false;
    }
};

/**
 * 🔒 Disable removing bots
 */
export const removeExistingWorkspace = async () => {
    console.warn('[INFO] Remove disabled → Static bots only.');
    return false;
};

/**
 * Ensure xml has `is_dbot` flag
 */
export const convertStrategyToIsDbot = xml_dom => {
    if (!xml_dom) return;
    xml_dom.setAttribute('is_dbot', 'true');
    return xml_dom;
};

// 🧹 Clear storage & recents at startup
localStorage.removeItem('saved_workspaces');
localStorage.removeItem('recent_strategies');
console.log('[INFO] Cleared saved/recent bots → Static bots only.');
