function Application(id, title, keywords, refrences, supervisor, researchGroup, thesisType, requiredKnowledge, deadline,discription ) {
    this.keywords = keywords
    this.refrences = refrences
    this.supervisor = supervisor
    this.researchGroup = researchGroup
    this.thesisType = thesisType
    this.requiredKnowledge = requiredKnowledge
    this.deadline = deadline
    this.description=discription
    this.title=title
    this.id = id
  };

export default Application;  