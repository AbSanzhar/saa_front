import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun, Table, TableRow, TableCell,WidthType, VerticalMergeType  } from "docx";
const PHONE_NUMBER = "07534563401";
const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
const EMAIL = "docx@docx.com";

export class DocumentCreator {
  // tslint:disable-next-line: typedef
  public create([experiences, educations, skills, achivements]): Document {
    const document = new Document({
      creator: 'Men'
    });
    document.addSection({
      children: [
        new Paragraph({
          children: [new TextRun({
            text: 'Об утверждении Правил оказания государственной услуги "Аккредитация субъектов научной и (или) научно-технической деятельности"',
            bold: true,
            size: 30,
            font: {
              name: "Arial",
            },
            color: '686868'
          }),
          ],
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.LEFT
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Приказ Министра образования и науки Республики Казахстан от 12 мая 2020 года № 196. Зарегистрирован в Министерстве юстиции Республики Казахстан 13 мая 2020 года № 20626',
              size: 22,
              font: {
                name: "Arial",
              },
              color: 'black'
            }),
          ],
          alignment: AlignmentType.LEFT
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Приложение 4' + '\n' + 'к Правилам оказания государственной',
                        size: 20,
                        font: {
                          name: "Times New Roman",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.CENTER
                  })],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Рейтинговый лист субъекта',
              size: 32,
              font: {
                name: "Courier New",
              },
              color: '303030'
            }),
          ],
          spacing: {
            before: 225,
          },
          alignment: AlignmentType.LEFT
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '(для юридических лиц)',
              size: 32,
              font: {
                name: "Courier New",
              },
              color: '303030'
            }),
          ],
          spacing: {
            after: 135
          },
          alignment: AlignmentType.LEFT
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '\tНазвание субъекта:___________________________________',
              size: 20,
              font: {
                name: "Courier New",
              },
              color: 'black'
            }),
          ],
          spacing: {
            after: 360
          },
          outlineLevel: 0
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '\tЮридический адрес, телефон, факс:____________________',
              size: 20,
              font: {
                name: "Courier New",
              },
              color: 'black'
            }),
          ],
          spacing: {
            after: 360
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '\tГод создания:____________',
              size: 20,
              font: {
                name: "Courier New",
              },
              color: 'black'
            }),
          ],
          spacing: {
            after: 360
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '\tИнтернет-ресурс/e-mail:_____________________',
              size: 20,
              font: {
                name: "Courier New",
              },
              color: 'black'
            }),
          ],
          spacing: {
            after: 360
          },
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '№',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                      new TextRun({
                        text: 'п/п',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Содержание показателей',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Единицы измерения',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Фактическое значение показателя',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '1',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '2',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '3',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '4',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),

            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Блок 1. Сведения об организации',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: ' ',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),


            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '1',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                  rowSpan: 4,
                  verticalMerge: VerticalMergeType.RESTART
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Дата первичной государственной регистрации:',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),

            new TableRow({
              children: [

                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '- до 1 года',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                  verticalMerge: VerticalMergeType.CONTINUE
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '0/1',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),


            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '- от 1 - 5 лет',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                  verticalMerge: VerticalMergeType.CONTINUE
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '0/1',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),

            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '- 5 и более лет',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                  verticalMerge: VerticalMergeType.CONTINUE
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '0/1',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),
                new TableCell({
                  children: [new Paragraph({
                    children: [
                      new TextRun({
                        text: '',
                        size: 20,
                        font: {
                          name: "Courier New",
                        },
                        color: 'black'
                      }),
                    ],
                    alignment: AlignmentType.LEFT
                  })],
                }),

              ],
            }),






          ],

          //                   width: {
          //     size: 100,
          //     type: WidthType.PERCENTAGE,
          // },
        }),


        //             new Table({
        // rows: [
        //     new TableRow({
        //         children: [
        //             new TableCell({
        //                 children: [new Paragraph("0,0")],
        //             }),
        //             new TableCell({
        //                 children: [new Paragraph("0,1")],
        //                 rowSpan: 2,
        //             }),
        //             new TableCell({
        //                 children: [new Paragraph("0,2")],
        //             }),
        //         ],
        //     }),
        //     new TableRow({
        //         children: [
        //             new TableCell({
        //                 children: [],
        //             }),
        //             new TableCell({
        //                 children: [new Paragraph("1,2")],
        //                 rowSpan: 2,
        //             }),
        //         ],
        //     }),
        //     new TableRow({
        //         children: [
        //             new TableCell({
        //                 children: [],
        //             }),
        //             new TableCell({
        //                 children: [],
        //             }),
        //         ],
        //     }),
        // ],
        // width: {
        //     size: 100,
        //     type: WidthType.PERCENTAGE,
        // },
// }),
        this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
        this.createHeading("Education"),
        ...educations
          .map((education) => {
            const arr: Paragraph[] = [];
            arr.push(
              this.createInstitutionHeader(education.schoolName, `${education.startDate.year} - ${education.endDate.year}`),
            );
            arr.push(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`));

            const bulletPoints = this.splitParagraphIntoBullets(education.notes);
            bulletPoints.forEach((bulletPoint) => {
              arr.push(this.createBullet(bulletPoint));
            });

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        this.createHeading("Experience"),
        ...experiences
          .map((position) => {
            const arr: Paragraph[] = [];

            arr.push(
              this.createInstitutionHeader(
                position.company.name,
                this.createPositionDateText(position.startDate, position.endDate, position.isCurrent),
              ),
            );
            arr.push(this.createRoleText(position.title));

            const bulletPoints = this.splitParagraphIntoBullets(position.summary);

            bulletPoints.forEach((bulletPoint) => {
              arr.push(this.createBullet(bulletPoint));
            });

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        this.createHeading("Skills, Achievements and Interests"),
        this.createSubHeading("Skills"),
        this.createSkillList(skills),
        this.createSubHeading("Achievements"),
        ...this.createAchivementsList(achivements),
        this.createSubHeading("Interests"),
        this.createInterests("Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."),
        this.createHeading("References"),
        new Paragraph(
          "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk",
        ),
        new Paragraph("More references upon request"),
        new Paragraph({
          text: "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
          alignment: AlignmentType.CENTER,
        }),
      ],
    });

    return document;
  }

  public createContactInfo(phoneNumber: string, profileUrl: string, email: string): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
        new TextRun("Address: 58 Elm Avenue, Kent ME4 6ER, UK").break(),
      ],
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  public createInstitutionHeader(institutionName: string, dateText: string): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map((skill) => skill.name).join(", ") + ".")],
    });
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        }),
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split("\n\n");
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(startDate: any, endDate: any, isCurrent: boolean): string {
    const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  }
}
