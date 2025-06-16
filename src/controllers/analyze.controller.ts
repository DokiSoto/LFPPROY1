import { Request, Response } from "express";
import { LexicalAnalyzer } from "../Analyzer/LexicalAnalyzer";
import { Career } from "../models/Career";
import { getCareers } from "../utils/StructureCareer";


export const analyze = (req: Request, res: Response) => {

    const input = req.body;
    let lexicalAnalyzer: LexicalAnalyzer = new LexicalAnalyzer();

    lexicalAnalyzer.scanner(input);

    let tokenList = lexicalAnalyzer.scanner(input);
    let errorList = lexicalAnalyzer.getErrorList();
    let careers: Career[] = getCareers(tokenList);

    
    res.json({
        "tokens": tokenList,
        "errors": errorList,
        "careers": careers
    });
}

export const home = (req: Request, res: Response) => {

    res.render('pages/menu');
}

export const pensum = (req: Request, res: Response) => {

    const id = req.params.id;
    res.render('pages/carrera', {id});
}