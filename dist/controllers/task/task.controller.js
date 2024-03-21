"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_entity_1 = __importDefault(require("../../models/task.entity"));
class TaskController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, completed } = req.body;
            if (!title) {
                return res.status(400).json({ erro: 'Título é obrigatório!' });
            }
            const task = new task_entity_1.default();
            task.title = title;
            task.completed = completed !== null && completed !== void 0 ? completed : false;
            yield task.save();
            return res.status(201).json(task);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield task_entity_1.default.find();
            return res.status(200).json(tasks);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ erro: 'O id é obrigatório.' });
            }
            const task = yield task_entity_1.default.findOneBy({ id: Number(id) });
            if (!task) {
                return res.status(404).json({ erro: 'Não encontrado' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // const id = req.params.id
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ erro: 'O id é obrigatório' });
            }
            const task = yield task_entity_1.default.findOneBy({ id: Number(id) });
            if (!task) {
                return res.status(404).json({ erro: 'Não encontrado' });
            }
            task.remove();
            return res.status(204).send();
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // const id = req.params.id
            const { title, completed } = req.body;
            if (!title) {
                return res.status(400).json({ error: 'O título é obrigatório' });
            }
            if (completed === undefined) {
                return res.status(400).json({ error: 'O completado é obrigatório' });
            }
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ erro: 'O id é obrigatório.' });
            }
            const task = yield task_entity_1.default.findOneBy({ id: Number(id) });
            if (!task) {
                return res.status(404).json({ erro: 'Não encontrado' });
            }
            task.title = title;
            task.completed = completed;
            yield task.save();
            return res.json(task);
        });
    }
}
exports.default = TaskController;
