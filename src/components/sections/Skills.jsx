import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';
import { skillGroups } from '../../data/skills';
import './Skills.css';

export function Skills() {
  return (
    <section id="skills" aria-label="Skills">
      <div className="container">
        <Reveal>
          <SectionTitle eyebrow="What I Do" heading="Skills & Tech" centered />
          <p className="skills__intro">
            My skill set spans the full stack — from crafting front-ends with HTML, CSS and JavaScript to building solid back-ends with Java and Hibernate. I love projects where design and functionality meet.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.1}>
              <div className="skills__group glass">
                <h3 className="skills__group-label" style={{ color: group.color }}>
                  {group.label}
                </h3>
                <div className="skills__items">
                  {group.skills.map(s => {
                    const Icon = s.Icon;
                    return (
                      <div
                        key={s.name}
                        className="skills__item"
                        style={{ '--hover-color': s.color }}
                      >
                        <div className="skills__icon-wrapper">
                          <Icon size={28} className="skills__icon" />
                        </div>
                        <span className="skills__name">{s.name}</span>
                        {/* Animated gradient border trick */}
                        <div className="skills__item-bg" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
